import { describe, it, expect } from '@jest/globals';
import { stripeConfig } from '@repo/config';
import { stripeService } from '../stripe';

describe('stripeService', () => {
    describe('createPaymentIntent', () => {
        it('creates a payment intent', async () => {
            const paymentIntent = await stripeService.createPaymentIntent('INR', 1000, 'test-customer-id');

            expect(paymentIntent).toHaveProperty('id');
            expect(paymentIntent).toHaveProperty('amount');
            expect(paymentIntent).toHaveProperty('currency');
            expect(paymentIntent).toHaveProperty('customer');
        });

        it('throws an error if the payment intent cannot be created', async () => {
            try {
                await stripeService.createPaymentIntent('USD', 1000, 'test-customer-id');
            } catch (error: unknown) {
                expect(error).toBeInstanceOf(Error);
                expect((error as Error).message).toEqual('Error creating payment intent');
            }
        });
    });

    describe('verifyWebhookRequest', () => {
        it('verifies a webhook request', async () => {
            const event = await stripeService.verifyWebhookRequest(
                stripeConfig.stripeSubscriptionVerificationWebHookSecret,
                'test-signature',
                JSON.stringify({ type: 'payment_succeeded' })
            );

            expect(event).toHaveProperty('type');
            expect(event).toHaveProperty('data');
        });

        it('throws an error if the request cannot be verified', async () => {
            try {
                await stripeService.verifyWebhookRequest(
                    stripeConfig.stripeSubscriptionVerificationWebHookSecret,
                    'invalid-signature',
                    JSON.stringify({ type: 'payment_succeeded' })
                );
            } catch (error: unknown) {
                expect(error).toBeInstanceOf(Error);
                expect((error as Error).message).toEqual('Error verifying webhook request');
            }
        });
    });
});
