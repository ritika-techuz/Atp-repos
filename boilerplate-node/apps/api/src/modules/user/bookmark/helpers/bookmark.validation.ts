import { constants } from '@repo/config';
import Joi from 'joi';

const addUpdateBookmarkSchema = {
    body: {
        target_id: Joi.number().integer().required(),
        target_type: Joi.string()
            .valid(...Object.values(constants.bookmarkType))
            .required()
    }
};

const listBookmarksSchema = {
    query: {
        target_type: Joi.string()
            .valid(...Object.values(constants.bookmarkType))
            .optional()
    }
};

export const bookmarkValidation = {
    addUpdateBookmarkSchema,
    listBookmarksSchema
};
