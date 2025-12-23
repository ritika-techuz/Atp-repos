import Joi from 'joi';
import { constants } from '@repo/config';

const getAllFeedbackSchema = {
    query: {
        user_id: Joi.number().optional(),
        status: Joi.number()
            .valid(...Object.values(constants.status))
            .optional()
    }
};

export const feedbackValidation = { getAllFeedbackSchema };
