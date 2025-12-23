import Joi from 'joi';
import { constants } from '@repo/config';

const getPlanSchema = {
    params: {
        plan_id: Joi.number().required()
    }
};

const listPlanSchema = {
    query: {
        plan_id: Joi.number().optional(),
        interval: Joi.number()
            .valid(...Object.values(constants.planInterval))
            .optional()
    }
};

export const planValidation = {
    getPlanSchema,
    listPlanSchema
};
