import { addMonths, subDays } from 'date-fns';
import { log } from '@repo/logger';
import { stripeService } from '@repo/stripe';
import { UserSubscription } from '@repo/db';
import { pdfService } from '@repo/file-service';
import { generateRandomString } from '@repo/utils';
import { sendMail, SUBJECTS, TEMPLATES } from '@repo/mailer';
import { appConfig, constants, storageConfig, stripeConfig } from '@repo/config';
import { s3Client, getPresignedUrl, uploadFile } from '@repo/storage-service';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { planService } from '../../common/plan/plan.service';
import {
    IUser,
    IPurchaseSubscriptionBody,
    IListTransactionQuery,
    IPaymentDataBody,
    ICalculatePromoCodeDiscountResponse,
    ICalculatePromoCodeDiscountBody,
    IPaymentDataResponse,
    IUpgradeSubscriptionBody,
    IPurchaseSubscriptionResponse,
    IUpgradeSubscriptionResponse,
    ICancelSubscriptionResponse
} from './helpers/subscription.types';

/**
 * @author Jitendra Singh
 * @description Calculates the discount amount and final price for a given plan and promo code.
 */
const calculatePromoCodeDiscount = (body: ICalculatePromoCodeDiscountBody): ICalculatePromoCodeDiscountResponse => {
    const {
        plan: { price },
        promoCode
    } = body;

    const { amount_off, percent_off } = promoCode;
    const discount = amount_off ?? (price * (percent_off ?? 0)) / 100;
    const finalPrice = Math.max(price - discount, 0);

    return { originalPrice: price, discount, finalPrice };
};

/**
 * @author Jitendra Singh
 * @description Calculates the payment data based on the provided parameters.
 */
const paymentData = (user: IUser, body: IPaymentDataBody): IPaymentDataResponse => {
    const { startDate, invoiceNumber, taxRate, taxAmount, planDetails, promoCodeDiscountAmount } = body;

    return {
        invoiceAndDatabaseFields: {
            interval: constants.planIntervalNumberToName[planDetails.interval as keyof typeof constants.planIntervalNumberToName],
            interval_count: planDetails.interval_count,
            price: planDetails.price || 0,
            tax_percentage: taxRate || 0,
            discount_amount: promoCodeDiscountAmount || 0,
            sub_total: planDetails.price || 0,
            tax_amount: taxAmount ? +taxAmount / 100 : 0,
            grand_total: +(((planDetails.price || 0) - promoCodeDiscountAmount) * (1 + (taxRate || 0) / 100)).toFixed(2)
        },
        databaseFields: {
            plan_id: planDetails.id,
            user_id: user.id,
            start_date: startDate,
            expiry_date: subDays(addMonths(startDate, planDetails.interval_count), 1)
        },
        invoiceFields: {
            invoice_number: invoiceNumber,
            tax_percentage: taxRate || 0,
            discount_percentage: 0,
            discount_amount: promoCodeDiscountAmount || 0,
            name: user?.first_name + ' ' + user?.last_name,
            email: user.email,
            start_date: `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`,
            plan_type: constants.planIntervalNumberToName[planDetails.type as keyof typeof constants.planIntervalNumberToName]
        }
    };
};

/**
 * @author Jitendra Singh
 * @description Retrieves the subscription details for the authenticated user.
 */
const viewSubscriptionService = async (user: IUser): Promise<UserSubscription> => {
    try {
        const transactionAttributes = [
            'id',
            'user_id',
            'price_id',
            'subscription_id',
            'subscription_item_id',
            'invoice_url',
            'invoice_number',
            'price',
            'discount_amount',
            'tax_percentage',
            'tax_amount',
            'sub_total',
            'grand_total',
            'start_date',
            'expiry_date',
            'is_switch',
            'is_cancelled',
            'is_added_by_cron',
            'provider',
            'payment_status',
            'status'
        ];

        const userSubscription = await UserSubscription.query()
            .select(...transactionAttributes)
            .findOne({ user_id: user.id, status: constants.subscriptionStatus['Active'] });

        if (!userSubscription) throw new CustomError(ResponseMessages.SUBSCRIPTION.NOT_FOUND, StatusCodes.NOT_FOUND);

        return userSubscription;
    } catch (error) {
        log.error('viewSubscriptionService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Retrieves the list of active subscription transactions for the specified user.
 */
const listTransactionService = async (user: IUser, query: IListTransactionQuery): Promise<UserSubscription[]> => {
    try {
        const transactionAttributes = [
            'id',
            'user_id',
            'price_id',
            'subscription_id',
            'subscription_item_id',
            'invoice_url',
            'invoice_number',
            'price',
            'discount_amount',
            'tax_percentage',
            'tax_amount',
            'sub_total',
            'grand_total',
            'start_date',
            'expiry_date',
            'is_switch',
            'is_cancelled',
            'is_added_by_cron',
            'provider',
            'payment_status',
            'status'
        ];

        const userSubscription = await UserSubscription.query()
            .select(...transactionAttributes)
            .where({ user_id: user.id, status: constants.subscriptionStatus['Active'] });

        return userSubscription;
    } catch (error) {
        log.error('listTransactionService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Purchases a subscription for the given user.
 */
const purchaseSubscriptionService = async (user: IUser, body: IPurchaseSubscriptionBody): Promise<IPurchaseSubscriptionResponse> => {
    const trx = await UserSubscription.startTransaction();
    try {
        const { plan_id, promo_code } = body;

        const planDetails = await planService.getPlanService({ plan_id });

        if (!planDetails) throw new CustomError(ResponseMessages.PLAN.NOT_FOUND, StatusCodes.NOT_FOUND);

        const startDate = new Date();
        const invoiceNumber = `INV-${user.id}` + '-' + generateRandomString(8);
        const promoCodeDiscountAmount = promo_code ? calculatePromoCodeDiscount({ plan: planDetails, promoCode: promo_code }).discount : 0;

        let taxRate = 0;
        let taxAmount = 0;

        const { invoiceAndDatabaseFields, invoiceFields, databaseFields } = paymentData(user, {
            ...body,
            startDate,
            invoiceNumber,
            taxRate,
            taxAmount,
            planDetails,
            promoCodeDiscountAmount
        });

        // Create subscription
        const subscription = await stripeService.createSubscription(user.stripe_customer_id, planDetails.price_id, promo_code?.id);

        await UserSubscription.query(trx).insert({
            user_id: user.id,
            plan_id: planDetails.id,
            price_id: planDetails.price_id,
            subscription_id: subscription.id,
            invoice_number: invoiceFields.invoice_number,
            price: invoiceAndDatabaseFields.price,
            discount_amount: invoiceAndDatabaseFields.discount_amount,
            tax_percentage: invoiceAndDatabaseFields.tax_percentage,
            tax_amount: invoiceAndDatabaseFields.tax_amount,
            sub_total: invoiceAndDatabaseFields.sub_total,
            grand_total: invoiceAndDatabaseFields.grand_total,
            start_date: databaseFields.start_date,
            expiry_date: databaseFields.expiry_date,
            payment_status: constants.paymentStatus['Pending'],
            status: constants.subscriptionStatus['Inactive']
        });

        await trx.commit();
        return subscription;
    } catch (error) {
        await trx.rollback();
        log.error('purchaseSubscriptionService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Upgrades a subscription to a higher plan for the authenticated user.
 */
const upgradeSubscriptionService = async (user: IUser, body: IUpgradeSubscriptionBody): Promise<IUpgradeSubscriptionResponse> => {
    const trx = await UserSubscription.startTransaction();
    try {
        const { plan_id, promo_code } = body;

        const planDetails = await planService.getPlanService({ plan_id });

        if (!planDetails) throw new CustomError(ResponseMessages.PLAN.NOT_FOUND, StatusCodes.NOT_FOUND);

        const userSubscription = await viewSubscriptionService(user);

        if (!userSubscription) throw new CustomError(ResponseMessages.SUBSCRIPTION.NOT_FOUND, StatusCodes.NOT_FOUND);

        const promoCodeDiscountAmount = promo_code ? calculatePromoCodeDiscount({ plan: planDetails, promoCode: promo_code }).discount : 0;

        if (promoCodeDiscountAmount && +planDetails?.price <= promoCodeDiscountAmount)
            throw new CustomError(ResponseMessages.SUBSCRIPTION.PRICE_EXCEEDED, StatusCodes.BAD_REQUEST);

        const startDate = new Date();
        const invoiceNumber = `INV-${user.id}` + '-' + generateRandomString(8);

        let taxRate = 0;
        let taxAmount = 0;

        const { invoiceAndDatabaseFields, invoiceFields, databaseFields } = paymentData(user, {
            ...body,
            startDate,
            invoiceNumber,
            taxRate,
            taxAmount,
            planDetails,
            promoCodeDiscountAmount
        });

        await UserSubscription.query(trx).update({ is_switch: true }).where('id', userSubscription.id);

        // Upgrade subscription
        const subscription = await stripeService.upgradeSubscription(
            userSubscription.subscription_id,
            userSubscription.subscription_item_id,
            planDetails.price_id,
            promo_code?.id
        );

        await UserSubscription.query(trx).insert({
            user_id: user.id,
            plan_id: planDetails.id,
            price_id: planDetails.price_id,
            subscription_id: subscription.id,
            invoice_number: invoiceFields.invoice_number,
            price: invoiceAndDatabaseFields.price,
            discount_amount: invoiceAndDatabaseFields.discount_amount,
            tax_percentage: invoiceAndDatabaseFields.tax_percentage,
            tax_amount: invoiceAndDatabaseFields.tax_amount,
            sub_total: invoiceAndDatabaseFields.sub_total,
            grand_total: invoiceAndDatabaseFields.grand_total,
            start_date: databaseFields.start_date,
            expiry_date: databaseFields.expiry_date,
            payment_status: constants.paymentStatus['Pending'],
            status: constants.subscriptionStatus['Upcoming']
        });

        await trx.commit();
        return subscription;
    } catch (error) {
        await trx.rollback();
        log.error('upgradeSubscriptionService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Cancels a subscription for the given user.
 */
const cancelSubscriptionService = async (user: IUser): Promise<ICancelSubscriptionResponse> => {
    try {
        const userSubscription = await viewSubscriptionService(user);

        if (!userSubscription) throw new CustomError(ResponseMessages.SUBSCRIPTION.NOT_FOUND, StatusCodes.NOT_FOUND);

        await stripeService.cancelSubscription(userSubscription.subscription_id);

        await userSubscription.$query().patch({ is_switch: false, is_cancelled: true });

        return { is_cancelled: true };
    } catch (error) {
        log.error('cancelSubscriptionService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Handles the Stripe webhook for payment verification events.
 */
const paymentVerificationWebhookService = async (stripeSignature: string, body: string): Promise<boolean> => {
    const trx = await UserSubscription.startTransaction();
    try {
        const event: any = await stripeService.verifyWebhookRequest(stripeConfig.stripeSubscriptionVerificationWebHookSecret, stripeSignature, body);

        // log.info('event ==========>', event.data.object.subscription);

        const userSubscriptionAttributes = [
            'id',
            'user_id',
            'plan_id',
            'invoice_number',
            'price',
            'discount_amount',
            'tax_percentage',
            'tax_amount',
            'sub_total',
            'grand_total',
            'start_date',
            'payment_status',
            'status'
        ];
        const userAttributes = ['id', 'first_name', 'last_name', 'email'];
        const planAttributes = ['id', 'name', 'price_id', 'type', 'currency', 'interval', 'interval_count'];

        const userSubscription = await UserSubscription.query()
            .select(...userSubscriptionAttributes)
            .where('subscription_id', event.data.object.subscription)
            .andWhereNot('payment_status', constants.paymentStatus['Paid'])
            .withGraphFetched('[user(selectUser), plan(selectPlan)]')
            .modifiers({
                selectUser: builder => builder.select(...userAttributes),
                selectPlan: builder => builder.select(...planAttributes)
            })
            .orderBy('created_at', 'desc')
            .first();

        if (!userSubscription) {
            await trx.rollback();
            throw new CustomError(ResponseMessages.SUBSCRIPTION.NOT_FOUND, StatusCodes.NOT_FOUND);
        }

        if (+userSubscription.status === constants.subscriptionStatus['Active']) {
            await trx.commit();
            return true;
        }

        if (event.type === 'invoice.payment_failed') {
            await userSubscription
                .$query(trx)
                .patch({
                    payment_status: constants.paymentStatus['Failed'],
                    provider_response: JSON.stringify(event)
                })
                .where('id', userSubscription.id);

            // sendMail(userSubscription.user.email, SUBJECTS.USER_SUBSCRIPTION_FAILED, TEMPLATES.USER_SUBSCRIPTION_FAILED, {
            //     name: userSubscription.user.fullname
            // });

            await trx.commit();
            return true;
        }

        await UserSubscription.query(trx)
            .patch({
                status: constants.subscriptionStatus['Inactive']
            })
            .where({ user_id: userSubscription.user_id, status: constants.subscriptionStatus['Active'] });

        const invoiceUrl = `USER-${userSubscription.user_id}/INVOICE/${userSubscription.invoice_number}.pdf`;

        const file = await pdfService.generatePdfFromTemplate(pdfService.TemplateNames['USER_SUBSCRIPTION_INVOICE'], {
            app_logo: appConfig.appLogoUrl,
            name: userSubscription.user.fullname,
            email: userSubscription.user.email,
            start_date: `${userSubscription.start_date.getMonth() + 1}/${userSubscription.start_date.getDate()}/${userSubscription.start_date.getFullYear()}`,
            invoice_number: userSubscription.invoice_number,
            interval: constants.planIntervalNumberToName[userSubscription.plan.interval as keyof typeof constants.planIntervalNumberToName],
            plan_type: constants.planTypeNumberToName[userSubscription.plan.type as keyof typeof constants.planTypeNumberToName],
            price: userSubscription.price,
            sub_total: userSubscription.sub_total,
            discount_amount: userSubscription.discount_amount,
            tax_amount: userSubscription.tax_amount,
            grand_total: userSubscription.grand_total,
            currency:
                constants.supportedCurrencyTypeNumberToName[
                    userSubscription.plan.currency as keyof typeof constants.supportedCurrencyTypeNumberToName
                ]
        });

        await uploadFile(s3Client, storageConfig.s3BucketName, invoiceUrl, file);

        await userSubscription
            .$query(trx)
            .patch({
                subscription_item_id: event.data.object.lines.data[event.data.object.lines.data.length - 1].subscription_item,
                invoice_url: invoiceUrl,
                payment_status: constants.paymentStatus['Paid'],
                status: constants.subscriptionStatus['Active'],
                provider_response: JSON.stringify(event)
            })
            .where('id', userSubscription.id);

        await trx.commit();

        if (userSubscription.user && event?.data?.object?.billing_reason === 'subscription_create') {
            sendMail(userSubscription.user.email, SUBJECTS.USER_PURCHASE_SUBSCRIPTION, TEMPLATES.USER_PURCHASE_SUBSCRIPTION, {
                name: userSubscription.user.fullname
                // attachments: [
                //     {
                //         filename: 'invoice.pdf',
                //         mimetype: 'application/pdf',
                //         path: userSubscription.invoice_url
                //     }
                // ]
            });
            return true;
        }

        await trx.commit();
        return true;
    } catch (error) {
        await trx.rollback();
        log.error('paymentVerificationWebhookService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Handles the Stripe webhook for subscription cancellation events.
 */
const subscriptionCancellationWebhookService = async (stripeSignature: string, body: string): Promise<boolean> => {
    const trx = await UserSubscription.startTransaction();
    try {
        const event: any = await stripeService.verifyWebhookRequest(stripeConfig.stripeSubscriptionCancellationWebHookSecret, stripeSignature, body);

        // log.info('event ==========>', event.data.object.subscription || event.data.object.id);

        const userSubscriptionAttributes = [
            'id',
            'user_id',
            'plan_id',
            'invoice_number',
            'price',
            'discount_amount',
            'tax_percentage',
            'tax_amount',
            'sub_total',
            'grand_total',
            'start_date',
            'payment_status',
            'status'
        ];
        const userAttributes = ['id', 'first_name', 'last_name', 'email'];
        const planAttributes = ['id', 'name', 'price_id', 'type', 'currency', 'interval', 'interval_count'];

        const userSubscription = await UserSubscription.query()
            .select(...userSubscriptionAttributes)
            .where('subscription_id', event.data.object.subscription || event.data.object.id)
            // .andWhere('status', constants.subscriptionStatus['Active'])
            .withGraphFetched('[user(selectUser), plan(selectPlan)]')
            .modifiers({
                selectUser: builder => builder.select(...userAttributes),
                selectPlan: builder => builder.select(...planAttributes)
            })
            .orderBy('created_at', 'desc')
            .first();

        if (!userSubscription) {
            await trx.rollback();
            throw new CustomError(ResponseMessages.SUBSCRIPTION.NOT_FOUND, StatusCodes.NOT_FOUND);
        }

        if (event.type === 'customer.subscription.deleted') {
            await userSubscription
                .$query(trx)
                .patch({
                    is_cancelled: true,
                    provider_response: JSON.stringify(event),
                    status: constants.subscriptionStatus['Inactive']
                })
                .where({ id: userSubscription.id });

            sendMail(userSubscription.user.email, SUBJECTS.USER_CANCEL_SUBSCRIPTION, TEMPLATES.USER_CANCEL_SUBSCRIPTION, {
                name: userSubscription.user.fullname
                // attachments: [
                //     {
                //         filename: 'invoice.pdf',
                //         mimetype: 'application/pdf',
                //         path: userSubscription.invoice_url
                //     }
                // ]
            });

            await trx.commit();
            return true;
        }

        await trx.commit();
        return true;
    } catch (error) {
        await trx.rollback();
        log.error('subscriptionCancellationWebhookService Catch: ', error);
        throw error;
    }
};

export const subscriptionService = {
    viewSubscriptionService,
    listTransactionService,
    purchaseSubscriptionService,
    upgradeSubscriptionService,
    cancelSubscriptionService,
    paymentVerificationWebhookService,
    subscriptionCancellationWebhookService
};
