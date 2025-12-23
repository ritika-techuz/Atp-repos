import express, { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { subscriptionController } from './subscription.controller';
import { subscriptionValidation } from './helpers/subscription.validation';
import userAuthMiddleware from '../../../middlewares/userAuth.middleware';

const router: Router = Router();

router.get('/', userAuthMiddleware, subscriptionController.viewSubscription);
router.get(
    '/transactions',
    userAuthMiddleware,
    validateRequest(subscriptionValidation.listTransactionSchema),
    subscriptionController.listTransaction
);
router.post(
    '/purchase',
    userAuthMiddleware,
    validateRequest(subscriptionValidation.purchaseSubscriptionSchema),
    subscriptionController.purchaseSubscription
);
router.put(
    '/upgrade',
    userAuthMiddleware,
    validateRequest(subscriptionValidation.upgradeSubscriptionSchema),
    subscriptionController.upgradeSubscription
);
router.patch('/cancel', userAuthMiddleware, subscriptionController.cancelSubscription);
router.post('/payment-verification/webhook', express.raw({ type: 'application/json' }), subscriptionController.paymentVerificationWebhook);
router.post('/cancellation/webhook', express.raw({ type: 'application/json' }), subscriptionController.subscriptionCancellationWebhook);

export const subscriptionRoutes = router;
