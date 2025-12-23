import Joi from 'joi';
import { constants } from '@repo/config';
import { defaultPagination } from '@repo/utils';

export const paginationSchema = {
    perPage: Joi.number().integer().optional().default(defaultPagination.perPage),
    page: Joi.number().integer().optional().default(defaultPagination.page),
    orderBy: Joi.string().optional().default(defaultPagination.orderBy),
    orderDir: Joi.string()
        .valid(...Object.values(constants.orderDir))
        .optional()
        .default(constants.orderDir.DESC)
};
