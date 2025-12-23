import Joi from 'joi';
import { constants } from '@repo/config';

const updateProfileSchema = {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        profile_url: Joi.string().optional()
    }
};

const changePasswordSchema = {
    body: {
        current_password: Joi.string().required(),
        new_password: Joi.string().required()
    }
};

const logoutSchema = {
    body: {
        device_type: Joi.number()
            .valid(...Object.values(constants.deviceType))
            .required()
    }
};

export const profileValidation = {
    updateProfileSchema,
    changePasswordSchema,
    logoutSchema
};
