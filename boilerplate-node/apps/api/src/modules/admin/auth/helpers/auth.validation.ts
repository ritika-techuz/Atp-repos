import Joi from 'joi';
import { constants } from '@repo/config';

const socialSignInSchema = {
    body: {
        social_id: Joi.string().required(),
        first_name: Joi.string().optional(),
        last_name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        mobile_number: Joi.string().optional(),
        password: Joi.string().optional(),
        profile_url: Joi.string().optional(),
        auth_type: Joi.number()
            .valid(...Object.values(constants.authType))
            .required(),
        device_type: Joi.number()
            .valid(...Object.values(constants.deviceType))
            .optional()
    }
};

const forgetPasswordSchema = {
    body: {
        email: Joi.string().email().required()
    }
};

const verifyResetPasswordLinkSchema = {
    params: {
        token: Joi.string().required()
    }
};

const resetPasswordSchema = {
    params: {
        token: Joi.string().required()
    },
    body: {
        password: Joi.string().required()
    }
};

export const authValidation = {
    socialSignInSchema,
    forgetPasswordSchema,
    verifyResetPasswordLinkSchema,
    resetPasswordSchema
};
