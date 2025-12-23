import { constants } from '@repo/config';
import { Notification } from '@repo/db';
import { log } from '@repo/logger';
import { NotificationHandler } from '../socket/notification.handler';
import { INotification, ISendNotificationPayload } from '../types/notification.types';
import { getNotificationVariables, replaceNotificationVariables } from '../utils/notification.utils';

export class NotificationService {
    /**
     * Send a notification to a user
     */
    static async sendNotification(payload: ISendNotificationPayload): Promise<INotification> {
        try {
            const roomId = `notification_${payload.receiver_id}`;

            const notification = await Notification.query().insert({
                receiver_type: payload.receiver_type,
                receiver_id: payload.receiver_id,
                room_id: roomId,
                title: payload.title,
                description: payload.description,
                redirection_type: payload.redirection_type,
                redirection_url: payload.redirection_url,
                type: payload.type,
                is_read: constants.isRead.Unread
            });

            const processedNotification = await this.processNotificationContent(notification as unknown as INotification);
            NotificationHandler.emitNotification(roomId, processedNotification);
            return processedNotification;
        } catch (error) {
            log.error('sendNotification: ', error);
            throw error;
        }
    }

    /**
     * Process notification content with dynamic variables
     */
    static async processNotificationContent(notification: INotification): Promise<INotification> {
        try {
            const variables = await getNotificationVariables(notification.receiver_id);

            return {
                ...notification,
                title: replaceNotificationVariables(notification.title, variables),
                description: replaceNotificationVariables(notification.description, variables)
            };
        } catch (error) {
            log.error('processNotificationContent: ', error);
            throw error;
        }
    }

    /**
     * Process multiple notifications
     */
    static async processNotifications(notifications: INotification[]): Promise<INotification[]> {
        try {
            return await Promise.all(notifications.map(notification => this.processNotificationContent(notification)));
        } catch (error) {
            log.error('processNotifications: ', error);
            throw error;
        }
    }
}
