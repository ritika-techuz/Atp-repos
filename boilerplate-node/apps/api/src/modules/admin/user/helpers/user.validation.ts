import Joi from 'joi';
import { constants } from '@repo/config';
import { paginationSchema } from '@repo/validator';

const getUserByIdSchema = {
    params: {
        id: Joi.number().required()
    }
};

const getAllUserSchema = {
    query: {
        status: Joi.number()
            .valid(...Object.values(constants.status))
            .optional(),
        search: Joi.string().optional(),
        ...paginationSchema
    }
};

const createUserSchema = {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.number()
            .valid(...Object.values(constants.role))
            .optional(),
        status: Joi.number()
            .valid(...Object.values(constants.status))
            .optional()
    }
};

const updateUserSchema = {
    body: {
        id: Joi.number().required(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        profile_url: Joi.string().optional()
    }
};

const updateUserStatusSchema = getUserByIdSchema;
const deleteUserSchema = updateUserStatusSchema;

export const userValidation = { getAllUserSchema, deleteUserSchema, updateUserStatusSchema, getUserByIdSchema, updateUserSchema, createUserSchema };
