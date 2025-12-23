import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { _service } from './staticPages.service';
import { Query } from './helpers/staticPages.types';

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

/**
 * @author Jainam Shah
 * @description List all rows.
 */
const list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await _service.listService(query as unknown as Query);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.STATIC_PAGES.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jainam Shah
 * @description Create or update a row.
 */
const createOrUpdate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, language } = req;
        const data = await _service.createOrUpdateService(body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.STATIC_PAGES.UPDATE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jainam Shah
 * @description Delete a row by its ID.
 */
const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, language } = req;
        const data = await _service.removeService(params.page);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.STATIC_PAGES.DELETE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const staticPagesController = {
    get,
    list,
    createOrUpdate,
    remove
};
