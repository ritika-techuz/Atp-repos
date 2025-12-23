import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { activityLogService } from './activity.service';
import { IActivityLogQuery } from './helpers/activity.types';

/**
 * @author Jitendra Singh
 * @description Handles GET /activity-logs requests.
 */
const listActivityLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await activityLogService.listActivityLogsService(query as unknown as IActivityLogQuery);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const activityController = {
    listActivityLogs
};
