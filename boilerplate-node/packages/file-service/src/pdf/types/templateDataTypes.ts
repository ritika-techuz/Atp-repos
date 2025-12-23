export interface ITESTData {
    customerName: string;
    email: string;
    items: { name: string; quantity: number; price: number }[];
    totalAmount: number;
}

export interface IUserSubscriptionInvoiceData {
    app_logo: string;
    name: string;
    email: string;
    address?: string;
    city_state_zip?: string;
    start_date: string;
    invoice_number: string;
    interval: string;
    plan_type: string;
    price: number;
    sub_total: number;
    discount_amount?: number;
    tax_amount?: number;
    grand_total: number;
    currency: string;
}

// Mapping template key to corresponding data type
export interface ITemplateDataMap {
    TEST: ITESTData;
    USER_SUBSCRIPTION_INVOICE: IUserSubscriptionInvoiceData;
}

export type TemplateDataKey = keyof ITemplateDataMap;
