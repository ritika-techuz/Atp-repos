import Stripe from 'stripe';
import { log } from '@repo/logger';
import { constants, stripeConfig } from '@repo/config';

// Create a Stripe instance
const stripeInstance = new Stripe(stripeConfig.stripeSecretKey);

/******************************************************** Plan ********************************************************/

/**
 * @author Jitendra Singh
 * @description Retrieves a Stripe price by its ID.
 */
const getProductIdFromPriceId = async (priceId: string): Promise<Stripe.Price> => {
    try {
        const price = await stripeInstance.prices.retrieve(priceId);

        if (!price || typeof price.product !== 'string') throw new Error('Invalid price or product not found');

        return price;
    } catch (error) {
        log.error('getProductIdFromPriceId Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Deactivates a Stripe price by setting its active status to false.
 */
const deActivatePrice = async (priceId: string): Promise<Stripe.Price> => {
    try {
        const price = await stripeInstance.prices.update(priceId, { active: false });
        return price;
    } catch (error) {
        log.error('deActivatePrice Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Creates a Stripe product.
 */
const createProduct = async (name: string, planPrice: number, currency: number, interval: number): Promise<Stripe.Product> => {
    try {
        const productOptions: Stripe.ProductCreateParams = {
            name: name,
            default_price_data: {
                unit_amount: planPrice * 100, // Stripe expects amount in the smallest currency unit
                currency: currency === constants.supportedCurrencyType['INR'] ? 'inr' : 'usd',
                recurring: {
                    interval: interval === constants.planInterval['Monthly'] ? 'month' : 'year'
                }
            },
            shippable: false,
            expand: ['default_price']
        };

        const product = await stripeInstance.products.create(productOptions);

        if (!product) throw new Error('Error creating product');

        return product;
    } catch (error) {
        log.error('createProduct Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Updates a Stripe product with a new price.
 */
const updateProduct = async (priceId: string, newPrice: number, currency: number, interval: number): Promise<Stripe.Product> => {
    try {
        const product = await getProductIdFromPriceId(priceId);

        if (!product) throw new Error('Invalid price or product not found');

        const productId = product.product as string;

        const newPriceObj = await stripeInstance.prices.create({
            product: productId,
            unit_amount: newPrice * 100,
            currency: currency === constants.supportedCurrencyType['INR'] ? 'inr' : 'usd',
            recurring: {
                interval: interval === constants.planInterval['Monthly'] ? 'month' : 'year'
            }
        });

        const updatedProduct = await stripeInstance.products.update(productId, {
            default_price: newPriceObj.id
        });

        await deActivatePrice(priceId);

        return updatedProduct;
    } catch (error) {
        log.error('updateProductPrice Catch:', error);
        throw error;
    }
};

/******************************************************** Customer ********************************************************/

/**
 * @author Jitendra Singh
 * @description Creates a new customer in Stripe.
 */
const createCustomer = async (name: string, email: string): Promise<Stripe.Customer> => {
    try {
        const customer = await stripeInstance.customers.create({ name, email });

        if (!customer) throw new Error('Error creating customer');

        return customer;
    } catch (error) {
        log.error('createCustomer Catch:', error);
        throw error;
    }
};

/******************************************************** Payment Intent ********************************************************/

/**
 * @author Jitendra Singh
 * @description Create a Stripe payment intent.
 */
const createPaymentIntent = async (currency: 'INR' | 'USD', amount: number, customer_id: string): Promise<Stripe.PaymentIntent> => {
    try {
        const paymentIntent = await stripeInstance.paymentIntents.create({
            customer: customer_id,
            amount: amount * 100,
            currency: currency,
            automatic_payment_methods: { enabled: true }
            // payment_method_types: ['card'],
        });
        if (!paymentIntent) throw new Error('Error creating payment intent');

        return paymentIntent;
    } catch (error) {
        log.error('createPaymentIntent Catch:', error);
        throw error;
    }
};

/******************************************************** Subscription ********************************************************/

/**
 * @author Jitendra Singh
 * @description Create a Stripe subscription for the given customer.
 */
const createSubscription = async (customerId: string, priceId: string, promoCode?: string): Promise<{ id: string; client_secret?: string }> => {
    try {
        const subscription = await stripeInstance.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            ...(promoCode && { discounts: [{ coupon: promoCode }] }),
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription', payment_method_types: ['card'] },
            expand: ['latest_invoice.confirmation_secret']
        });

        if (!subscription) throw new Error('Error creating subscription');

        return {
            id: subscription.id,
            client_secret:
                typeof subscription.latest_invoice === 'string' ? undefined : subscription.latest_invoice?.confirmation_secret?.client_secret
        };
    } catch (error) {
        log.error('createSubscription Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Upgrades a Stripe subscription item for the given subscription.
 */
const upgradeSubscription = async (
    subscriptionId: string,
    subscriptionItemId: string,
    priceId: string,
    promoCode?: string
): Promise<{ id: string; client_secret?: string }> => {
    try {
        const subscription = await stripeInstance.subscriptions.update(subscriptionId, {
            items: [
                {
                    id: subscriptionItemId,
                    price: priceId
                }
            ],
            ...(promoCode && { discounts: [{ coupon: promoCode }] }),
            proration_behavior: 'none',
            billing_cycle_anchor: 'now',
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription', payment_method_types: ['card'] },
            expand: ['latest_invoice.confirmation_secret']
        });

        if (!subscription) throw new Error('Error upgrading subscription');

        return {
            id: subscription.id,
            client_secret:
                typeof subscription.latest_invoice === 'string' ? undefined : subscription.latest_invoice?.confirmation_secret?.client_secret
        };
    } catch (error) {
        log.error('upgradeSubscription Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Cancels a Stripe subscription.
 */
const cancelSubscription = async (subscriptionId: string): Promise<{ is_cancelled: boolean }> => {
    try {
        await stripeInstance.subscriptions.update(subscriptionId, { cancel_at_period_end: true });

        return { is_cancelled: true };
    } catch (error) {
        log.error('cancelSubscription Catch:', error);
        throw error;
    }
};

/******************************************************** Promotion Code ********************************************************/

/**
 * @author Jitendra Singh
 * @description Creates a Stripe promotion code.
 */
const createPromoCode = async (promoCodeName: string, discountValue: number, discountType: number): Promise<Stripe.Coupon> => {
    try {
        const coupon = await stripeInstance.coupons.create({
            name: promoCodeName,
            ...(discountType === constants.promoCodeType['Fixed'] ? { amount_off: discountValue } : { percent_off: discountValue }),
            duration: 'forever'
        });

        return coupon;
    } catch (error) {
        log.error('createPromoCode Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Deletes a Stripe promotion code.
 */
const deletePromoCode = async (couponId: string): Promise<Stripe.DeletedCoupon> => {
    try {
        const coupon = await stripeInstance.coupons.del(couponId);
        return coupon;
    } catch (error) {
        log.error('createPromoCode Catch:', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Validates a Stripe promotion code.
 */
const validatePromoCode = async (promo_code: string): Promise<Stripe.Coupon> => {
    try {
        const promoCode = await stripeInstance.promotionCodes.list({ code: promo_code, active: true });

        if (!promoCode?.data?.length) throw new Error('Invalid Promo Code');

        const promoCodeData = promoCode.data.find(item => item.code === promo_code);

        if (!promoCodeData) throw new Error('Invalid Promo Code');

        if (!promoCodeData['active']) throw new Error('Promo code not active');

        if (!promoCodeData['coupon']['valid']) throw new Error('Invalid Promo Code');

        return promoCodeData.coupon;
    } catch (error) {
        log.error('validatePromoCode Catch:', error);
        throw error;
    }
};

/******************************************************** Webhook ********************************************************/

/**
 * @author Jitendra Singh
 * @description Verify a Stripe webhook request.
 */
const verifyWebhookRequest = async (stripe_webhook_secret: string, stripe_signature: string, body: string): Promise<Stripe.Event> => {
    try {
        const event = stripeInstance.webhooks.constructEvent(body, stripe_signature, stripe_webhook_secret);
        if (!event) throw new Error('Error verifying webhook request');
        return event;
    } catch (error) {
        log.error('verifyWebhookRequest Catch:', error);
        throw error;
    }
};

export const stripeService = {
    createProduct,
    updateProduct,
    createCustomer,
    createPaymentIntent,
    createSubscription,
    upgradeSubscription,
    cancelSubscription,
    createPromoCode,
    deletePromoCode,
    validatePromoCode,
    verifyWebhookRequest
};
