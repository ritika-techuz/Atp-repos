import Joi from 'joi';
import { paginationSchema } from '@repo/validator';

const PARAMS = {
    params: {
        page: Joi.string().required()
    }
};

const QUERY = {
    query: {
        search: Joi.string().optional(),
        ...paginationSchema
    }
};

const CREATE_OR_UPDATE = {
    body: {
        id: Joi.number().optional(),
        page: Joi.string().required(),
        content: Joi.string().required()
    }
};

export const staticPagesValidation = {
    PARAMS,
    QUERY,
    CREATE_OR_UPDATE
};
