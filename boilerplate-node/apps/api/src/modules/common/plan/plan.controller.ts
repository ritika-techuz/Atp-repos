import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { planService } from './plan.service';
import { IPlanParams } from './helpers/plan.types';

/**
 * @author Jitendra Singh
 * @description Handles GET /plan/:plan_id requests.
 */
const getPlan = async (req: Request<IPlanParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, language } = req;
        const data = await planService.getPlanService(params);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PLAN.FETCH_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Handles GET /plans requests.
 */
const listPlans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await planService.listPlansService(query);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PLAN.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const planController = {
    getPlan,
    listPlans
};
