import Joi from 'joi';
import { constants } from '@repo/config';
import { paginationSchema } from '@repo/validator';

const getPromoCodeSchema = {
    params: {
        id: Joi.number().required()
    }
};

const listPromoCodeSchema = {
    query: {
        search: Joi.string().optional(),
        type: Joi.number()
            .valid(...Object.values(constants.promoCodeType))
            .optional(),
        status: Joi.number()
            .valid(...Object.values(constants.promoCodeStatus))
            .optional(),
        ...paginationSchema
    }
};

const createPromCodeSchema = {
    body: {
        promo_code: Joi.string().min(6).max(12).required(),
        discount_value: Joi.number().min(0).max(100).required(),
        start_date: Joi.date().required(),
        expiry_date: Joi.date().required(),
        type: Joi.number()
            .valid(...Object.values(constants.promoCodeType))
            .optional(),
        status: Joi.number()
            .valid(...Object.values(constants.promoCodeStatus))
            .optional()
    }
};

const updatePromoCodeSchema = {
    params: {
        id: Joi.number().required()
    },
    body: {
        promo_code: Joi.string().min(6).max(12).required(),
        discount_value: Joi.number().min(0).max(100).required(),
        start_date: Joi.date().required(),
        expiry_date: Joi.date().required(),
        type: Joi.number()
            .valid(...Object.values(constants.promoCodeType))
            .optional(),
        status: Joi.number()
            .valid(...Object.values(constants.promoCodeStatus))
            .optional()
    }
};

const updatePromoCodeStatusSchema = {
    params: {
        id: Joi.number().required()
    }
};

const deletePromoCodeSchema = {
    params: {
        id: Joi.number().required()
    }
};

export const promoCodeValidation = {
    getPromoCodeSchema,
    listPromoCodeSchema,
    createPromCodeSchema,
    updatePromoCodeSchema,
    updatePromoCodeStatusSchema,
    deletePromoCodeSchema
};
