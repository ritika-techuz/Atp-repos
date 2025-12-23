export const stripeConfig = {
    stripeLiveMode: Number(process.env.STRIPE_LIVE_MODE) || 0, // 0=> Test Mode, 1=> Live Mode
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeSubscriptionVerificationWebHookSecret: process.env.STRIPE_SUBSCRIPTION_VERIFICATION_WEB_HOOK_SECRET!,
    stripeSubscriptionCancellationWebHookSecret: process.env.STRIPE_SUBSCRIPTION_CANCELLATION_WEB_HOOK_SECRET!
};
