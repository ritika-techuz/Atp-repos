import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { stateService } from './state.service';

/**
 * @author Jitendra Singh
 * @description Handles GET /states requests.
 */
const listStates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await stateService.listStatesService(query);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.STATE.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const stateController = {
    listStates
};
