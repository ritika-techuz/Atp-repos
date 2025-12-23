import Joi from 'joi';
import { paginationSchema } from '@repo/validator';

const ListSchema = {
    query: {
        search: Joi.string().optional(),
        status: Joi.number().valid(1, 2).optional(),
        ...paginationSchema
    }
};

const CreateSchema = {
    body: {
        question: Joi.string().required(),
        answer: Joi.string().required(),
        status: Joi.number().valid(1, 2).optional()
    }
};

const UpdateSchema = {
    body: {
        id: Joi.number().required(),
        question: Joi.string().required(),
        answer: Joi.string().required(),
        status: Joi.number().valid(1, 2).optional()
    }
};

const DeleteSchema = {
    params: {
        id: Joi.number().required()
    }
};

export const faqValidation = {
    ListSchema,
    CreateSchema,
    UpdateSchema,
    DeleteSchema
};
