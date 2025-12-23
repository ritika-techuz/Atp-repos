import Joi from 'joi';

const PARAMS = {
    params: {
        page: Joi.string().required()
    }
};

export const staticPagesValidation = {
    PARAMS
};
