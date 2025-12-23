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

/**
 * @author Jainam Shah
 * @description Create a new row.
 */
const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, language } = req;
        const data = await _service.createService(body);
        return sendResponse(res, StatusCodes.CREATED, ResponseMessages.COMMON.CREATE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jainam Shah
 * @description Update a row by its ID.
 */
const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, language } = req;
        const data = await _service.updateService(+body.id, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.UPDATE_SUCCESS, data, language);
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
        const data = await _service.removeService(+params.id);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.DELETE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const faqController = {
    list,
    create,
    update,
    remove
};
