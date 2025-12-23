export const constants = {
    // Languages
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'fr', 'es', 'de', 'hi'],

    // Password
    passwordsaltRound: 10,

    // Pagination
    orderDir: {
        ASC: 'asc',
        DESC: 'desc'
    },

    // Links
    adminResetForgetLink: 'admin/auth/reset-password',
    adminAccountVerificationLink: 'admin/auth/verify-account',
    adminLogin: 'admin/auth/signin',
    userLogin: 'auth/signin',
    userResetForgetLink: 'auth/reset-password',
    userAccountVerificationLink: 'auth/verify-account',
    superAdminResetForgetLink: 'reset-password',
    loginPageURL: 'http://www.example-site.com/login',

    // Device Types
    deviceType: {
        MOBILE: 1,
        DESKTOP: 2,
        TABLET: 3
    },

    // Activity types
    activityType: {
        LOGIN: 1,
        LOGOUT: 2
    },

    // File Validations and Sizes (in MB)
    defaultFileSize: 10,
    profileImageSize: 10,

    // File Types
    supportedProfileImageTypes: ['image/jpg', 'image/jpeg', 'image/png'],

    // Auth Types
    authType: {
        EMAIL: 1,
        PHONE: 2,
        GOOGLE: 3,
        FACEBOOK: 4,
        APPLE: 5
    },
    authTypeNumberToName: {
        1: 'EMAIL',
        2: 'PHONE',
        3: 'GOOGLE',
        4: 'FACEBOOK',
        5: 'APPLE'
    },

    // User Roles
    role: {
        Admin: 1,
        User: 2
    },
    roleNumberToName: {
        1: 'Admin',
        2: 'User'
    },

    // Common Status
    status: {
        Active: 1,
        Inactive: 2
    },
    statusNumberToName: {
        1: 'Active',
        2: 'Inactive'
    },

    adminStatus: {
        Active: 1,
        Inactive: 2
    },
    adminStatusNumberToName: {
        1: 'Active',
        2: 'Inactive'
    },

    userStatus: {
        Active: 1,
        Inactive: 2
    },
    userStatusNumberToName: {
        1: 'Active',
        2: 'Inactive'
    },

    // provider
    provider: {
        Stripe: 1,
        Razorpay: 2
    },
    providerNumberToName: {
        1: 'Stripe',
        2: 'Razorpay'
    },

    // Plan Types
    planType: {
        Basic: 1,
        Pro: 2
    },
    planTypeNumberToName: {
        1: 'Basic',
        2: 'Pro'
    },

    // Plan intervals
    planInterval: {
        Daily: 1,
        Weekly: 2,
        Monthly: 3,
        Yearly: 4
    },
    planIntervalNumberToName: {
        1: 'Daily',
        2: 'Weekly',
        3: 'Monthly',
        4: 'Yearly'
    },

    // Plan Provider
    planProvider: {
        Stripe: 1,
        Razorpay: 2
    },
    planProviderNumberToName: {
        1: 'Stripe',
        2: 'Razorpay'
    },

    // Plan Status
    planStatus: {
        Active: 1,
        Inactive: 2
    },
    planStatusNumberToName: {
        1: 'Active',
        2: 'Inactive'
    },

    // Stripe Supported Currencies
    supportedCurrencyType: {
        INR: 1,
        USD: 2
    },
    supportedCurrencyTypeNumberToName: {
        1: 'INR',
        2: 'USD'
    },

    // Promocode Types
    promoCodeType: {
        Fixed: 1,
        Percentage: 2
    },
    promoCodeTypeNumberToName: {
        1: 'Fixed',
        2: 'Percentage'
    },

    // Promocode Status
    promoCodeStatus: {
        Active: 1,
        Inactive: 2,
        Expired: 3
    },
    promoCodeStatusNumberToName: {
        1: 'Active',
        2: 'Inactive',
        3: 'Expired'
    },

    // Subscription Status
    subscriptionStatus: {
        Active: 1,
        Inactive: 2,
        Upcoming: 3
    },
    subscriptionStatusNumberToName: {
        1: 'Active',
        2: 'Inactive',
        3: 'Upcoming'
    },

    // Payment Status
    paymentStatus: {
        Paid: 1,
        Failed: 2,
        Pending: 3
    },
    paymentStatusNumberToName: {
        1: 'Paid',
        2: 'Failed',
        3: 'Pending'
    },

    // Rate Limiter
    rateLimiter: {
        LOGIN_RATE_LIMIT: {
            windowMs: 3600000, // +process.env.LOGIN_RATE_LIMIT_WINDOW_MS, // Hour in milliseconds
            maxLimit: 10, // +process.env.LOGIN_RATE_LIMIT_MAX_LIMIT, // Requests per hour
            message: 'You have exceeded the your hourly rate limit. Please contact Support.' // Rate limit exceeded message
        }
    },

    redisKey: {
        CountryList: 'CountryList'
    },

    messageStatus: {
        Sent: 1,
        Delivered: 2,
        Read: 3
    },
    messageStatusNumberToName: {
        1: 'Sent',
        2: 'Delivered',
        3: 'Read'
    },
    isRead: {
        Unread: 2,
        Read: 1
    },
    isReadNumberToName: {
        2: 'Unread',
        1: 'Read'
    },

    //Feedback types
    feedbackType: {
        System: 1,
        Module: 2
    },
    bookmarkType: {
        User: 1,
        Blog: 2
    },
    bookmarkTypeNumberToName: {
        1: 'User',
        2: 'Blog'
    },
    rolePermissionType: {
        Granted: 1,
        'Not Granted': 2
    }
} as const;

export type SupportedLanguage = (typeof constants.supportedLanguages)[number];
export type SupportedProfileImageType = (typeof constants.supportedProfileImageTypes)[number];
