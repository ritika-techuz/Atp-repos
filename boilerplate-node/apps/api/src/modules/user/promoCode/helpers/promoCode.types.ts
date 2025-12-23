export interface IValidatePromoCodeParams {
    id: number;
}

export interface IValidatePromoCodeResponse {
    id: string;
    amount_off: number | null;
    percent_off: number | null;
}
