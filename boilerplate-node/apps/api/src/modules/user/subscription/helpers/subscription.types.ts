export interface ICalculatePromoCodeDiscountBody {
    plan: {
        price: number;
    };
    promoCode: {
        amount_off: number | null;
        percent_off: number | null;
    };
}

export interface ICalculatePromoCodeDiscountResponse {
    originalPrice: number;
    discount: number;
    finalPrice: number;
}

export interface IPaymentDataBody {
    startDate: Date;
    invoiceNumber: string;
    taxRate: number;
    taxAmount: number;
    planDetails: {
        id: number;
        price: number;
        price_id: string;
        type: number;
        interval: number;
        interval_count: number;
    };
    promoCodeDiscountAmount: number;
}

export interface IPaymentDataResponse {
    invoiceAndDatabaseFields: {
        interval: string;
        interval_count: number;
        price: number;
        tax_percentage: number;
        discount_amount: number;
        sub_total: number;
        tax_amount: number;
        grand_total: number;
    };
    databaseFields: {
        plan_id: number;
        user_id: number;
        start_date: Date;
        expiry_date: Date;
    };
    invoiceFields: {
        invoice_number: string;
        tax_percentage: number;
        discount_percentage: number;
        discount_amount: number;
        name: string;
        email: string;
        start_date: string;
        plan_type: string;
    };
}

export interface IUser {
    id: number;
    stripe_customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    profile_url: string;
    role: number;
    status: number;
}

export interface IPurchaseSubscriptionBody {
    plan_id: number;
    promo_code: {
        id: string;
        amount_off: number | null;
        percent_off: number | null;
    };
}

export interface IPurchaseSubscriptionResponse {
    id: string;
    client_secret?: string;
}

export interface IUpgradeSubscriptionBody {
    plan_id: number;
    promo_code: {
        id: string;
        amount_off: number | null;
        percent_off: number | null;
    };
}

export interface IUpgradeSubscriptionResponse {
    id: string;
    client_secret?: string;
}

export interface ICancelSubscriptionResponse {
    is_cancelled: boolean;
}

export interface IListTransactionQuery {
    page: number;
    limit: number;
}
