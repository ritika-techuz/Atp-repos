import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { adminfeedbackService } from './admin.feedback.service';

/**
 * @author Yagnesh Acharya
 * @description Fetch All feedbacks based on user_id and status , both fields are optional
 */
const getAllFeedbacks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { language } = req;
        const data = await adminfeedbackService.getAllFeedBackService(req.query);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.FEEDBACK.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const adminFeedbackController = {
    getAllFeedbacks
};
