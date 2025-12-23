import Joi from 'joi';
import { paginationSchema } from '@repo/validator';

const listActivitySchema = {
    query: {
        user_id: Joi.number().optional(),
        search: Joi.string().optional(),
        from_date: Joi.date().optional(),
        to_date: Joi.date().optional(),
        ...paginationSchema
    }
};

export const activityValidation = {
    listActivitySchema
};
