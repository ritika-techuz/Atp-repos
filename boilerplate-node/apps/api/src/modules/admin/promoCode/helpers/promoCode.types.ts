import { Pagination } from '@repo/utils';

export interface IPromoCodeParams {
    id: number;
}

export interface IListPromoCodeQuery extends Pagination {
    search?: string;
    type?: number;
    status?: number;
}

export interface ICreatePromoCodeBody {
    promo_code: string;
    discount_value: number;
    start_date: Date;
    expiry_date: Date;
    type?: number;
    status?: number;
}

export interface IUpdatePromoCodeParams extends IPromoCodeParams {}

export interface IUpdatePromoCodeBody extends ICreatePromoCodeBody {}

export interface IUpdatePromoCodeStatusParams extends IPromoCodeParams {}

export interface IDeletePromoCodeParams extends IPromoCodeParams {}
