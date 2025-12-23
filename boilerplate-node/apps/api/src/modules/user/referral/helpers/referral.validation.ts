import { paginationSchema } from '@repo/validator';
import Joi from 'joi';

const getReferralHistorySchema = {
    query: {
        user_id: Joi.number().required(),
        ...paginationSchema
    }
};

export const referralValidation = { getReferralHistorySchema };
