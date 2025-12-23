import { describe, it, expect } from '@jest/globals';
import { stripeConfig } from '../stripe';

describe('stripeConfig', () => {
    it('loads stripe environment variables', () => {
        expect(stripeConfig.stripeLiveMode).toEqual(Number(process.env.STRIPE_LIVE_MODE) || 0);
        expect(stripeConfig.stripeSecretKey).toEqual(process.env.STRIPE_SECRET_KEY);
        expect(stripeConfig.stripeSubscriptionVerificationWebHookSecret).toEqual(process.env.STRIPE_SUBSCRIPTION_VERIFICATION_WEB_HOOK_SECRET);
        expect(stripeConfig.stripeSubscriptionCancellationWebHookSecret).toEqual(process.env.STRIPE_SUBSCRIPTION_CANCELLATION_WEB_HOOK_SECRET);
    });
});
