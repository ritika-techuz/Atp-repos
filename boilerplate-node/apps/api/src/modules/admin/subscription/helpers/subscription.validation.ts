import Joi from 'joi';
import { constants } from '@repo/config';
import { paginationSchema } from '@repo/validator';

const listTransactionSchema = {
    query: {
        user_id: Joi.number().optional(),
        search: Joi.string().optional(),
        status: Joi.number()
            .valid(...Object.values(constants.subscriptionStatus))
            .optional(),
        payment_status: Joi.number()
            .valid(...Object.values(constants.paymentStatus))
            .optional(),
        ...paginationSchema
    }
};

export const subscriptionValidation = {
    listTransactionSchema
};
