import { ResponseMessages, sendResponse, StatusCodes } from '@repo/response-handler';
import { NextFunction, Request, Response } from 'express';
import { INotificationCount, INotificationMarkAsRead, INotificationQuery } from './helpers/notification.types';
import { notificationService } from './notification.service';

/**
 * @author Sanjay Balai
 * @description Handles GET /notification requests.
 */
const getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await notificationService.getNotificationsService(query as INotificationQuery);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.NOTIFICATION.FETCH_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Sanjay Balai
 * @description Handles PUT /notification/mark-as-read requests.
 */
const markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await notificationService.markAsReadService(query as unknown as INotificationMarkAsRead);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.NOTIFICATION.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Sanjay Balai
 * @description Handles GET /notification/count requests.
 */
const getUnreadCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await notificationService.getUnreadCountService(query as unknown as INotificationCount);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.NOTIFICATION.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const notificationController = {
    getNotifications,
    markAsRead,
    getUnreadCount
};
