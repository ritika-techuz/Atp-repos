import { log } from '@repo/logger';
import { PromoCode } from '@repo/db';
import { constants } from '@repo/config';
import { StatusCodes, CustomError, ResponseMessages } from '@repo/response-handler';
import { IValidatePromoCodeParams, IValidatePromoCodeResponse } from './helpers/promoCode.types';

/**
 * @author Jitendra Singh
 * @description Validates a Stripe promotion code.
 */
const validatePromoCodeService = async (params: IValidatePromoCodeParams): Promise<IValidatePromoCodeResponse> => {
    try {
        const { id } = params;

        const promoCodeAttributes = [
            'id',
            'coupon_id',
            'promo_code',
            'discount_value',
            'start_date',
            'expiry_date',
            'type',
            'status',
            'created_at',
            'updated_at',
            'deleted_at'
        ];

        const promoCode = await PromoCode.query()
            .select(...promoCodeAttributes)
            .where('id', id)
            .andWhere('status', constants.promoCodeStatus['Active'])
            .andWhere('deleted_at', null)
            .andWhere('expiry_date', '>', new Date())
            .andWhere('start_date', '<=', new Date())
            .first();

        if (!promoCode) throw new CustomError(ResponseMessages.PROMO_CODE.INVALID_CODE, StatusCodes.BAD_REQUEST);

        return {
            id: promoCode.coupon_id,
            amount_off: +promoCode.type === constants.promoCodeType['Fixed'] ? promoCode.discount_value : null,
            percent_off: +promoCode.type === constants.promoCodeType['Percentage'] ? promoCode.discount_value : null
        };
    } catch (error) {
        log.error('validatePromoCodeService Catch: ', error);
        throw error;
    }
};

export const promoCodeService = {
    validatePromoCodeService
};
