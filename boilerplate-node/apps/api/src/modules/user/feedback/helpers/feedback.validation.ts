import Joi from 'joi';
import { constants } from '@repo/config';

const postFeedbackSchema = {
    body: {
        module_id: Joi.number().optional(),
        feedback: Joi.string().required(),
        rating: Joi.number().positive().min(0).max(5).optional(),
        type: Joi.number()
            .valid(...Object.values(constants.feedbackType))
            .required()
    }
};

export const feedbackValidation = { postFeedbackSchema };
