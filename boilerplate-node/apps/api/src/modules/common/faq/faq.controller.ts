import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { _service } from './faq.service';
import { Query } from './helpers/faq.types';

/**
 * @author Jainam Shah
 * @description List all rows.
 */
const list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await _service.listService(query as unknown as Query);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const faqController = {
    list
};
