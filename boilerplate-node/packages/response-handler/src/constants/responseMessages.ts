export const ResponseMessages = {
    SERVER: {
        ERROR: 'server.error',
        SSL_CERTIFICATES_NOT_FOUND: 'server.ssl_certificates_not_found'
    },
    COMMON: {
        SUCCESS: 'common.success',
        ERROR: 'common.error',
        VALIDATION_ERROR: 'common.validation_error',
        NOT_AUTHENTICATED: 'common.not_authenticated',
        SESSION_EXPIRED: 'common.session_expired',
        UNSUPPORTED_FILE_TYPE: 'common.unsupported_file_type',
        NOT_FOUND: 'common.not_found',
        FETCH_SUCCESS: 'common.fetch_success',
        LIST_SUCCESS: 'common.list_success',
        CREATE_SUCCESS: 'common.create_success',
        UPDATE_SUCCESS: 'common.update_success',
        DELETE_SUCCESS: 'common.delete_success'
    },
    USER: {
        FETCH_SUCCESS: 'user.fetch_success',
        LIST_SUCCESS: 'user.list_success',
        NOT_FOUND: 'user.not_found',
        ALREADY_EXISTS: 'user.already_exists',
        NOT_ACTIVE: 'user.not_active',
        SIGNUP_SUCCESS: 'user.signup_success',
        ACCOUNT_DELETED: 'user.account_deleted',
        UPDATE_SUCCESS: 'user.update_success',
        UPDATE_FAILED: 'user.update_failed',
        CREATE_SUCCESS: 'user.create_success'
    },
    AUTH: {
        LOGIN_SUCCESS: 'auth.login_success',
        INVALID_CREDENTIALS: 'auth.invalid_credentials',
        UNAUTHORIZED: 'auth.unauthorized',
        ACCESS_DENIED: 'auth.access_denied'
    },
    PROFILE: {
        FETCH_SUCCESS: 'profile.fetch_success',
        UPDATE_SUCCESS: 'profile.update_success'
    },
    PASSWORD: {
        INVALID_FORGET_PASSWORD_LINK: 'password.invalid_forget_password_link',
        INVALID_RESET_PASSWORD_LINK: 'password.invalid_reset_password_link',
        FORGET_PASSWORD_LINK_EXPIRED: 'password.forget_password_link_expired',
        LINK_VERIFICATION_SUCCESS: 'password.link_verification_success',
        FORGOT_PASSWORD_SUCCESS: 'password.forgot_password_success',
        RESET_PASSWORD_SUCCESS: 'password.reset_password_success',
        INVALID_PASSWORD: 'password.invalid_password',
        PASSWORD_CANNOT_BE_SAME_AS_CURRENT: 'password.password_cannot_be_same_as_current',
        PASSWORD_CHANGE_SUCCESS: 'password.password_change_success'
    },
    COUNTRY: {
        FETCH_SUCCESS: 'country.fetch_success',
        NOT_FOUND: 'country.not_found',
        LIST_SUCCESS: 'country.list_success'
    },
    STATE: {
        FETCH_SUCCESS: 'state.fetch_success',
        NOT_FOUND: 'state.not_found',
        LIST_SUCCESS: 'state.list_success'
    },
    NOTIFICATION: {
        FETCH_SUCCESS: 'notification.fetch_success',
        NOT_FOUND: 'notification.not_found',
        LIST_SUCCESS: 'notification.list_success',
        NOTIFICATION_HANDLER_NOT_INITIALIZED: 'notification.notification_handler_not_initialized'
    },
    SOCKET: {
        SOCKET_NOT_INITIALIZED: 'socket.socket_not_initialized'
    },
    FEEDBACK: {
        FETCH_SUCCESS: 'feedback.fetch_success',
        SAVE_SUCCESS: 'feedback.save_success',
        SAVE_FAILED: 'feedback.save_failed',
        NOT_FOUND: 'feedback.not_found',
        LIST_SUCCESS: 'feedback.list_success'
    },
    REFERRAL: {
        LIST_SUCCESS: 'referral.list_success'
    },
    BOOKMARK: {
        FETCH_SUCCESS: 'bookmark.fetch_success',
        NOT_FOUND: 'bookmark.not_found',
        LIST_SUCCESS: 'bookmark.list_success',
        ALREADY_EXISTS: 'bookmark.already_exists',
        ADD_SUCCESS: 'bookmark.add_success',
        REMOVE_SUCCESS: 'bookmark.remove_success'
    },
    PLAN: {
        FETCH_SUCCESS: 'plan.fetch_success',
        NOT_FOUND: 'plan.not_found',
        LIST_SUCCESS: 'plan.list_success',
        CREATE_SUCCESS: 'plan.create_success',
        CREATE_FAILED: 'plan.create_failed',
        UPDATE_SUCCESS: 'plan.update_success',
        UPDATE_FAILED: 'plan.update_failed'
    },
    PROMO_CODE: {
        FETCH_SUCCESS: 'promo_code.fetch_success',
        NOT_FOUND: 'promo_code.not_found',
        LIST_SUCCESS: 'promo_code.list_success',
        CREATE_SUCCESS: 'promo_code.create_success',
        CREATE_FAILED: 'promo_code.create_failed',
        UPDATE_SUCCESS: 'promo_code.update_success',
        DELETE_SUCCESS: 'promo_code.delete_success',
        INVALID_CODE: 'promo_code.invalid_code',
        VALIDATE_SUCCESS: 'promo_code.validate_success'
    },
    SUBSCRIPTION: {
        FETCH_SUCCESS: 'subscription.fetch_success',
        NOT_FOUND: 'subscription.not_found',
        LIST_SUCCESS: 'subscription.list_success',
        PRICE_EXCEEDED: 'subscription.price_exceeded',
        CANCEL_SUCCESS: 'subscription.cancel_success',
        PURCHASE_SUCCESS: 'subscription.purchase_success',
        UPGRADE_SUCCESS: 'subscription.upgrade_success'
    },
    STATIC_PAGES: {
        FETCH_SUCCESS: 'static_pages.fetch_success',
        NOT_FOUND: 'static_pages.not_found',
        LIST_SUCCESS: 'static_pages.list_success',
        UPDATE_SUCCESS: 'static_pages.update_success',
        DELETE_SUCCESS: 'static_pages.delete_success'
    }
} as const;
