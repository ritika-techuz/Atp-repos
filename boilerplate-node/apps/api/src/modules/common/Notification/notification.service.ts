import { constants } from '@repo/config';
import { Notification } from '@repo/db';
import { log } from '@repo/logger';
import { INotification, NotificationService } from '@repo/notifications';
import { defaultPagination } from '@repo/utils';
import { INotificationCount, INotificationMarkAsRead, INotificationQuery } from './helpers/notification.types';
/**
 * @author Sanjay Balai
 * @description Fetches notifications with pagination.
 */
const getNotificationsService = async (query: INotificationQuery): Promise<INotification[]> => {
    try {
        const {
            recordPerPage = query.recordPerPage || defaultPagination.perPage,
            pageNumber = query.pageNumber || defaultPagination.page,
            startRange = (+pageNumber - 1) * +recordPerPage,
            orderBy = query.orderBy || defaultPagination.orderBy,
            endRange = +pageNumber * +recordPerPage - 1,
            orderDir = defaultPagination.orderDir
        } = query;

        const result = await Notification.query().orderBy(orderBy, orderDir).range(startRange, endRange);

        // Process notifications to replace dynamic variables
        const processedNotifications = await NotificationService.processNotifications(result.results);
        return processedNotifications;
    } catch (error) {
        log.error('getNotificationsService Catch: ', error);
        throw error;
    }
};

/**
 * @author Sanjay Balai
 * @description Marks a notification as read.
 */
const markAsReadService = async (query: INotificationMarkAsRead): Promise<null> => {
    try {
        const { id } = query;
        await Notification.query().patch({ is_read: constants.isRead.Read }).where('id', id).where('is_read', constants.isRead.Unread);

        return null;
    } catch (error) {
        log.error('markAsReadService Catch: ', error);
        throw error;
    }
};

/**
 * @author Sanjay Balai
 * @description Gets the unread count of notifications.
 */
const getUnreadCountService = async (query: INotificationCount): Promise<Notification | undefined> => {
    try {
        const { receiverType, receiverId } = query;
        const count = await Notification.query()
            .where({
                receiver_type: receiverType,
                receiver_id: receiverId,
                is_read: constants.isRead.Unread
            })
            .count('id', { as: 'notification_count' })
            .first();
        return count;
    } catch (error) {
        log.error('getUnreadCountService Catch: ', error);
        throw error;
    }
};

export const notificationService = {
    getNotificationsService,
    markAsReadService,
    getUnreadCountService
};
