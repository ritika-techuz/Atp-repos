import Joi from 'joi';
import { paginationSchema } from '@repo/validator';

const QUERY = {
    query: {
        search: Joi.string().optional(),
        status: Joi.number().valid(1, 2).optional(),
        ...paginationSchema
    }
};

export const faqValidation = {
    QUERY
};
