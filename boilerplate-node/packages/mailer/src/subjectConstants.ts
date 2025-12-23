import { appConfig } from '@repo/config';

export const SUBJECTS = {
    WELCOME: `Welcome to ${appConfig.appName}`,
    FORGOT_PASSWORD: 'Forgot Password',
    RESET_PASSWORD: 'Reset Password',
    ACCOUNT_VERIFICATION: 'Account Verification',
    EMAIL_VERIFICATION: 'Email Verification',
    INVITATION: 'Invitation',
    USER_PURCHASE_SUBSCRIPTION: 'Subscription Purchase',
    USER_UPGRADE_SUBSCRIPTION: 'Subscription Upgrade',
    USER_CANCEL_SUBSCRIPTION: 'Subscription Cancel',
    CREATE_USER: 'Your account has been created – Login credentials inside'
} as const;

export type TemplateName = (typeof SUBJECTS)[keyof typeof SUBJECTS];
