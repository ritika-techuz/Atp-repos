import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { _service } from './staticPages.service';

/**
 * @author Jainam Shah
 * @description Get a particular row by its ID.
 */
const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, language } = req;
        const data = await _service.getService(params.page);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.STATIC_PAGES.FETCH_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const staticPagesController = {
    get
};
