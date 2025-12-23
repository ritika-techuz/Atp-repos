export const TemplateNames = {
    TEST: 'TEST',
    USER_SUBSCRIPTION_INVOICE: 'USER_SUBSCRIPTION_INVOICE'
} as const;

export type TemplateKey = keyof typeof TemplateNames;

export const TemplateFileMap: Record<TemplateKey, string> = {
    TEST: 'test.ejs',
    USER_SUBSCRIPTION_INVOICE: 'userSubscriptionInvoice.ejs'
};
