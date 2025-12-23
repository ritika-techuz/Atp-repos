import Joi from 'joi';

const validatePromoCodeSchema = {
    params: {
        id: Joi.number().required()
    }
};

export const promoCodeValidation = {
    validatePromoCodeSchema
};
