import Joi from 'joi';
import { constants } from '@repo/config';

const createPlanSchema = {
    body: {
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().precision(2).required(),
        tax_percentage: Joi.number().precision(2).max(999).optional(),
        type: Joi.number()
            .valid(...Object.values(constants.planType))
            .required(),
        provider: Joi.string()
            .valid(...Object.values(constants.planProvider))
            .required(),
        currency: Joi.string()
            .valid(...Object.values(constants.supportedCurrencyType))
            .required(),
        interval: Joi.number()
            .valid(...Object.values(constants.planInterval))
            .optional(),
        status: Joi.number()
            .valid(...Object.values(constants.planStatus))
            .required(),
        features: Joi.string()
            .custom((value: string, helpers: Joi.CustomHelpers<string>): string => {
                try {
                    const parsed = JSON.parse(value);
                    if (!Array.isArray(parsed)) {
                        throw helpers.error('any.invalid', { message: 'Features must be a JSON array' });
                    }
                    return value;
                } catch (e) {
                    throw helpers.error('any.invalid', { message: 'Features must be a valid JSON string' });
                }
            }, 'JSON string validation')
            .required()
            .label('Features')
    }
};

const updatePlanSchema = {
    params: {
        id: Joi.number().required()
    },
    body: {
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().precision(2).required(),
        tax_percentage: Joi.number().precision(2).max(999).optional(),
        type: Joi.number()
            .valid(...Object.values(constants.planType))
            .required(),
        provider: Joi.string()
            .valid(...Object.values(constants.planProvider))
            .required(),
        currency: Joi.string()
            .valid(...Object.values(constants.supportedCurrencyType))
            .required(),
        interval: Joi.number()
            .valid(...Object.values(constants.planInterval))
            .optional(),
        status: Joi.number()
            .valid(...Object.values(constants.planStatus))
            .required(),
        features: Joi.string()
            .custom((value: string, helpers: Joi.CustomHelpers<string>): string => {
                try {
                    const parsed = JSON.parse(value);
                    if (!Array.isArray(parsed)) {
                        throw helpers.error('any.invalid', { message: 'Features must be a JSON array' });
                    }
                    return value;
                } catch (e) {
                    throw helpers.error('any.invalid', { message: 'Features must be a valid JSON string' });
                }
            }, 'JSON string validation')
            .required()
            .label('Features')
    }
};

const updatePlanStatusSchema = {
    params: {
        id: Joi.number().required()
    }
};

export const planValidation = {
    createPlanSchema,
    updatePlanSchema,
    updatePlanStatusSchema
};
