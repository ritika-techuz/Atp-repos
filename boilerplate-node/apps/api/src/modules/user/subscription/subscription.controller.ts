import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { IUser } from './helpers/subscription.types';
import { subscriptionService } from './subscription.service';

/**
 * @author Jitendra Singh
 * @description Retrieves the subscription details for the authenticated user.
 */
const viewSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, language } = req;
        const data = await subscriptionService.viewSubscriptionService(user as IUser);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.SUBSCRIPTION.FETCH_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Retrieves the transaction history for the authenticated user.
 */
const listTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, query, language } = req;
        const data = await subscriptionService.listTransactionService(user as IUser, query as any);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.SUBSCRIPTION.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Purchases a subscription for the authenticated user.
 */
const purchaseSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, body, language } = req;
        const data = await subscriptionService.purchaseSubscriptionService(user as IUser, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.SUBSCRIPTION.PURCHASE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Upgrades a subscription for the authenticated user.
 */
const upgradeSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, body, language } = req;
        const data = await subscriptionService.upgradeSubscriptionService(user as IUser, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.SUBSCRIPTION.UPGRADE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Cancels a subscription for the authenticated user.
 */
const cancelSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, language } = req;
        const data = await subscriptionService.cancelSubscriptionService(user as IUser);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.SUBSCRIPTION.CANCEL_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Handles the Stripe webhook for payment verification events.
 */
const paymentVerificationWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, language } = req;
        const stripeSignature = req.headers['stripe-signature'];
        const data = await subscriptionService.paymentVerificationWebhookService(stripeSignature as string, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Handles the Stripe webhook for subscription cancellation events.
 */
const subscriptionCancellationWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, language } = req;
        const stripeSignature = req.headers['stripe-signature'];
        const data = await subscriptionService.subscriptionCancellationWebhookService(stripeSignature as string, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const subscriptionController = {
    viewSubscription,
    listTransaction,
    purchaseSubscription,
    upgradeSubscription,
    cancelSubscription,
    paymentVerificationWebhook,
    subscriptionCancellationWebhook
};
