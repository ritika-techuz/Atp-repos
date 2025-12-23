import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { subscriptionService } from './subscription.service';

/**
 * @author Jitendra Singh
 * @description Handles GET /transactions requests to list all transactions with pagination.
 */
const listTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await subscriptionService.listTransactionService(query as any);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.SUBSCRIPTION.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const subscriptionController = {
    listTransaction
};
