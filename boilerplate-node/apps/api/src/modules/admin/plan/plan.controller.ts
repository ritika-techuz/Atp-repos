import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { planService } from './plan.service';
import { IUpdatePlanParams, IUpdatePlanStatusParams } from './helpers/plan.types';

/**
 * @author Jitendra Singh
 * @description Creates a new plan.
 */
const createPlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, language } = req;
        const data = await planService.createPlanService(body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PLAN.CREATE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Updates an existing plan using its ID.
 */
const updatePlan = async (req: Request<IUpdatePlanParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, body, language } = req;
        await planService.updatePlanService(params, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PLAN.UPDATE_SUCCESS, null, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Updates the status of a plan by its ID.
 */
const updatePlanStatus = async (req: Request<IUpdatePlanStatusParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, language } = req;
        await planService.updatePlanStatusService(params);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PLAN.UPDATE_SUCCESS, null, language);
    } catch (error) {
        next(error);
    }
};

export const planController = {
    createPlan,
    updatePlan,
    updatePlanStatus
};
