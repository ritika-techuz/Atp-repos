import { log } from '@repo/logger';
import { PromoCode } from '@repo/db';
import { constants } from '@repo/config';
import { stripeService } from '@repo/stripe';
import { createPagination, PaginationResponse } from '@repo/utils';
import { StatusCodes, CustomError, ResponseMessages } from '@repo/response-handler';
import {
    ICreatePromoCodeBody,
    IDeletePromoCodeParams,
    IListPromoCodeQuery,
    IPromoCodeParams,
    IUpdatePromoCodeBody,
    IUpdatePromoCodeParams,
    IUpdatePromoCodeStatusParams
} from './helpers/promoCode.types';

/**
 * @author Jitendra Singh
 * @description Fetches a promo code by its ID.
 */
const getPromoCodeService = async (params: IPromoCodeParams): Promise<PromoCode> => {
    try {
        const { id } = params;

        const promoCodeAttributes = ['id', 'coupon_id', 'promo_code', 'discount_value', 'start_date', 'expiry_date', 'type', 'status'];

        const promoCode = await PromoCode.query()
            .select(...promoCodeAttributes)
            .findOne({ id, deleted_at: null });

        if (!promoCode) throw new CustomError(ResponseMessages.PROMO_CODE.NOT_FOUND, StatusCodes.NOT_FOUND);

        return promoCode;
    } catch (error) {
        log.error('getPromoCodeService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Lists all promo codes with pagination.
 */
const listPromoCodeService = async (query: IListPromoCodeQuery): Promise<PaginationResponse> => {
    try {
        const { search, type, status, perPage, page, orderBy, orderDir } = query;
        const startRange = (page - 1) * perPage;
        const endRange = page * perPage - 1;

        const promoCodeAttributes = ['id', 'coupon_id', 'promo_code', 'discount_value', 'start_date', 'expiry_date', 'type', 'status'];

        const promoCodeQuery = PromoCode.query()
            .select(...promoCodeAttributes)
            .where({ deleted_at: null });

        if (search) promoCodeQuery.where('promo_code', 'like', `%${search}%`);
        if (type) promoCodeQuery.where('type', type);
        if (status) promoCodeQuery.where('status', status);

        const promoCodes = await promoCodeQuery.limit(perPage).range(startRange, endRange).orderBy(orderBy, orderDir);

        const paginatedPromoCodes = createPagination(promoCodes.total, page, perPage, promoCodes.results);

        return paginatedPromoCodes;
    } catch (error) {
        log.error('listPromoCodeService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Creates a new promo code on Stripe and stores it in the Promo Code table.
 */
const createPromoCodeService = async (body: ICreatePromoCodeBody): Promise<PromoCode> => {
    try {
        const {
            promo_code,
            discount_value,
            start_date,
            expiry_date,
            type = constants.promoCodeType['Percentage'],
            status = constants.promoCodeStatus['Active']
        } = body;

        const promoCode = await stripeService.createPromoCode(promo_code, discount_value, type);

        if (!promoCode) throw new CustomError(ResponseMessages.PROMO_CODE.CREATE_FAILED, StatusCodes.BAD_REQUEST);

        const createdPromoCode = await PromoCode.query().insert({
            coupon_id: promoCode.id,
            promo_code,
            discount_value,
            start_date,
            expiry_date,
            type,
            status
        });

        return createdPromoCode;
    } catch (error) {
        log.error('createPromoCodeService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Updates a promo code by its ID. Updates the promo code details in both Stripe and the Promo Code table.
 */
const updatePromoCodeService = async (params: IUpdatePromoCodeParams, body: IUpdatePromoCodeBody): Promise<void> => {
    try {
        const { id } = params;
        const {
            promo_code,
            discount_value,
            start_date,
            expiry_date,
            type = constants.promoCodeType['Percentage'],
            status = constants.promoCodeStatus['Active']
        } = body;

        const promoCodeDetails = await getPromoCodeService({ id });

        if (!promoCodeDetails) throw new CustomError(ResponseMessages.PROMO_CODE.NOT_FOUND, StatusCodes.NOT_FOUND);

        const promoCode = await stripeService.createPromoCode(promo_code, discount_value, type);

        if (!promoCode) throw new CustomError(ResponseMessages.PROMO_CODE.CREATE_FAILED, StatusCodes.BAD_REQUEST);

        await stripeService.deletePromoCode(promoCodeDetails.coupon_id);

        await promoCodeDetails.$query().patch({
            coupon_id: promoCode.id,
            promo_code,
            discount_value,
            start_date,
            expiry_date,
            type,
            status
        });

        return;
    } catch (error) {
        log.error('updatePromoCodeService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Updates the status of a promo code by marking it as active or inactive.
 */
const updatePromoCodeStatusService = async (params: IUpdatePromoCodeStatusParams): Promise<void> => {
    try {
        const { id } = params;

        const promoCode = await getPromoCodeService({ id });

        if (!promoCode) throw new CustomError(ResponseMessages.PROMO_CODE.NOT_FOUND, StatusCodes.NOT_FOUND);

        await promoCode.$query().patch({
            status:
                +promoCode.status === constants.promoCodeStatus['Active']
                    ? constants.promoCodeStatus['Inactive']
                    : constants.promoCodeStatus['Active']
        });

        return;
    } catch (error) {
        log.error('updatePromoCodeStatusService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Deletes a promo code by marking it as deleted in the database and removing it from Stripe.
 */
const deletePromoCodeService = async (params: IDeletePromoCodeParams): Promise<void> => {
    try {
        const { id } = params;

        const promoCode = await getPromoCodeService({ id });

        if (!promoCode) throw new CustomError(ResponseMessages.PROMO_CODE.NOT_FOUND, StatusCodes.NOT_FOUND);

        await stripeService.deletePromoCode(promoCode.coupon_id);

        await promoCode.$query().patch({ status: constants.promoCodeStatus['Expired'], deleted_at: new Date() });

        return;
    } catch (error) {
        log.error('deletePromoCodeService Catch: ', error);
        throw error;
    }
};

export const promoCodeService = {
    getPromoCodeService,
    listPromoCodeService,
    createPromoCodeService,
    updatePromoCodeService,
    updatePromoCodeStatusService,
    deletePromoCodeService
};
