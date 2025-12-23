import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { promoCodeService } from './promoCode.service';
import { IValidatePromoCodeParams } from './helpers/promoCode.types';

/**
 * @author Jitendra Singh
 * @description Validates a promo code.
 */
const validatePromoCode = async (req: Request<IValidatePromoCodeParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, language } = req;
        const data = await promoCodeService.validatePromoCodeService(params);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PROMO_CODE.VALIDATE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const promoCodeController = {
    validatePromoCode
};
