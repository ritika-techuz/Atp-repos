import { describe, it, expect } from '@jest/globals';
import { constants } from '../constants';

describe('constantsConfig', () => {
    it('exports the right object', () => {
        expect(constants).toEqual(
            expect.objectContaining({
                defaultLanguage: 'en',
                supportedLanguages: expect.arrayContaining(['en', 'fr', 'es', 'de', 'hi']),
                passwordsaltRound: 10,
                adminResetForgetLink: 'admin/auth/reset-password',
                adminAccountVerificationLink: 'admin/auth/verify-account',
                adminLogin: 'admin/auth/signin',
                userLogin: 'auth/signin',
                userResetForgetLink: 'auth/reset-password',
                userAccountVerificationLink: 'auth/verify-account',
                superAdminResetForgetLink: 'reset-password',
                deviceType: expect.objectContaining({
                    MOBILE: 1,
                    DESKTOP: 2,
                    TABLET: 3
                }),
                activityType: expect.objectContaining({
                    LOGIN: 1,
                    LOGOUT: 2
                }),
                defaultFileSize: 10,
                profileImageSize: 10,
                supportedProfileImageTypes: expect.arrayContaining(['image/jpg', 'image/jpeg', 'image/png']),
                authType: expect.objectContaining({
                    EMAIL: 1,
                    PHONE: 2,
                    GOOGLE: 3,
                    FACEBOOK: 4,
                    APPLE: 5
                }),
                authTypeNumberToName: expect.objectContaining({
                    1: 'EMAIL',
                    2: 'PHONE',
                    3: 'GOOGLE',
                    4: 'FACEBOOK',
                    5: 'APPLE'
                }),
                role: expect.objectContaining({
                    Admin: 1,
                    User: 2
                }),
                roleNumberToName: expect.objectContaining({
                    1: 'Admin',
                    2: 'User'
                }),
                status: expect.objectContaining({
                    Active: 1,
                    Inactive: 2
                }),
                statusNumberToName: expect.objectContaining({
                    1: 'Active',
                    2: 'Inactive'
                }),
                adminStatus: expect.objectContaining({
                    Active: 1,
                    Inactive: 2
                }),
                adminStatusNumberToName: expect.objectContaining({
                    1: 'Active',
                    2: 'Inactive'
                }),
                userStatus: expect.objectContaining({
                    Active: 1,
                    Inactive: 2
                }),
                userStatusNumberToName: expect.objectContaining({
                    1: 'Active',
                    2: 'Inactive'
                }),
                provider: expect.objectContaining({
                    Stripe: 1,
                    Razorpay: 2
                }),
                providerNumberToName: expect.objectContaining({
                    1: 'Stripe',
                    2: 'Razorpay'
                }),
                planType: expect.objectContaining({
                    Basic: 1,
                    Pro: 2
                }),
                planTypeNumberToName: expect.objectContaining({
                    1: 'Basic',
                    2: 'Pro'
                }),
                planInterval: expect.objectContaining({
                    Daily: 1,
                    Weekly: 2,
                    Monthly: 3,
                    Yearly: 4
                }),
                planIntervalNumberToName: expect.objectContaining({
                    1: 'Daily',
                    2: 'Weekly',
                    3: 'Monthly',
                    4: 'Yearly'
                }),
                planProvider: expect.objectContaining({
                    Stripe: 1,
                    Razorpay: 2
                }),
                planProviderNumberToName: expect.objectContaining({
                    1: 'Stripe',
                    2: 'Razorpay'
                }),
                planStatus: expect.objectContaining({
                    Active: 1,
                    Inactive: 2
                }),
                planStatusNumberToName: expect.objectContaining({
                    1: 'Active',
                    2: 'Inactive'
                }),
                supportedCurrencyType: expect.objectContaining({
                    INR: 1,
                    USD: 2
                }),
                supportedCurrencyTypeNumberToName: expect.objectContaining({
                    1: 'INR',
                    2: 'USD'
                }),
                promoCodeType: expect.objectContaining({
                    Fixed: 1,
                    Percentage: 2
                }),
                promoCodeTypeNumberToName: expect.objectContaining({
                    1: 'Fixed',
                    2: 'Percentage'
                }),
                promoCodeStatus: expect.objectContaining({
                    Active: 1,
                    Inactive: 2,
                    Expired: 3
                }),
                promoCodeStatusNumberToName: expect.objectContaining({
                    1: 'Active',
                    2: 'Inactive',
                    3: 'Expired'
                }),
                subscriptionStatus: expect.objectContaining({
                    Active: 1,
                    Inactive: 2,
                    Upcoming: 3
                }),
                subscriptionStatusNumberToName: expect.objectContaining({
                    1: 'Active',
                    2: 'Inactive',
                    3: 'Upcoming'
                }),
                paymentStatus: expect.objectContaining({
                    Paid: 1,
                    Failed: 2,
                    Pending: 3
                }),
                paymentStatusNumberToName: expect.objectContaining({
                    1: 'Paid',
                    2: 'Failed',
                    3: 'Pending'
                }),
                rateLimiter: expect.objectContaining({
                    LOGIN_RATE_LIMIT: expect.objectContaining({
                        windowMs: 3600000,
                        maxLimit: 10,
                        message: 'You have exceeded the your hourly rate limit. Please contact Support.'
                    })
                }),
                feedbackType: expect.objectContaining({
                    System: 1,
                    Module: 2
                })
            })
        );
    });
});
