import Joi from 'joi';

const purchaseSubscriptionSchema = {
    body: {
        plan_id: Joi.number().required(),
        promo_code: Joi.object({
            id: Joi.string().required(),
            amount_off: Joi.number().allow(null).optional(),
            percent_off: Joi.number().allow(null).optional()
        }).optional()
    }
};

const upgradeSubscriptionSchema = {
    body: {
        plan_id: Joi.number().required(),
        promo_code: Joi.object({
            id: Joi.string().required(),
            amount_off: Joi.number().allow(null).optional(),
            percent_off: Joi.number().allow(null).optional()
        }).optional()
    }
};

const listTransactionSchema = {
    query: {
        // ...commonValidations.schema.paginationSchema
    }
};

export const subscriptionValidation = {
    purchaseSubscriptionSchema,
    upgradeSubscriptionSchema,
    listTransactionSchema
};
