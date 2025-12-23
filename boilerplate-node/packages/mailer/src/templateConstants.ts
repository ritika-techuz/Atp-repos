export const TEMPLATES = {
    WELCOME: 'welcome',
    FORGOT_PASSWORD: 'forgotPassword',
    USER_PURCHASE_SUBSCRIPTION: 'userPurchaseSubscription',
    USER_UPGRADE_SUBSCRIPTION: 'userUpgradeSubscription',
    USER_CANCEL_SUBSCRIPTION: 'userCancelSubscription',
    CREATE_USER: 'createUser'
} as const;

export type TemplateName = (typeof TEMPLATES)[keyof typeof TEMPLATES];
