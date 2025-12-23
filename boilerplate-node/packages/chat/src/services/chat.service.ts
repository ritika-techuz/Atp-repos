import { constants } from '@repo/config';
import { Message, QueryBuilder } from '@repo/db';
import { log } from '@repo/logger';
import { defaultPagination } from '@repo/utils';
import { IMessage, IMessageHistoryParams, IPaginatedMessages, ISendMessagePayload } from '../types/message.types';
/**
 * @author Sanjay Balai
 * @description ChatService class for handling chat operations
 */
export class ChatService {
    /**
     * Send a message to a user
     */
    static async sendMessage(payload: ISendMessagePayload): Promise<IMessage> {
        try {
            const message = await Message.query().insert({
                sender_id: payload.sender_id,
                receiver_id: payload.receiver_id,
                room_id: payload.room_id,
                message: payload.message,
                attachment_url: payload.attachment_url,
                status: constants.messageStatus.Sent
            });

            return message;
        } catch (error) {
            log.error('send message: ', error);
            throw error;
        }
    }

    /**
     * Get message history between two users with pagination
     */
    static async getMessageHistory(params: IMessageHistoryParams): Promise<IPaginatedMessages> {
        try {
            const {
                user_id,
                other_user_id,
                before_date,
                recordPerPage = params.recordPerPage || defaultPagination.perPage,
                pageNumber = params.pageNumber || defaultPagination.page,
                orderBy = params.orderBy || defaultPagination.orderBy,
                orderDir = defaultPagination.orderDir
            } = params;

            const startRange = (pageNumber - 1) * recordPerPage;
            const endRange = pageNumber * recordPerPage - 1;

            // Build query
            const query = Message.query()
                .where((builder: QueryBuilder<Message>) => {
                    builder
                        .where((q: QueryBuilder<Message>) => {
                            q.where('sender_id', user_id).where('receiver_id', other_user_id);
                        })
                        .orWhere((q: QueryBuilder<Message>) => {
                            q.where('sender_id', other_user_id).where('receiver_id', user_id);
                        });
                })
                .orderBy('created_at', 'desc');

            // Add date filter if provided
            if (before_date) {
                query.where('created_at', '<', before_date);
            }

            // Get total count
            const total = await query.clone().resultSize();

            // Get messages with pagination and ordering
            const messages = await query.withGraphFetched('[sender, receiver]').orderBy(orderBy, orderDir).range(startRange, endRange);

            return {
                messages: messages.results,
                total,
                page: pageNumber,
                limit: recordPerPage,
                has_more: total > endRange + 1
            };
        } catch (error) {
            log.error('getMessageHistory: ', error);
            throw error;
        }
    }

    /**
     * Mark message as delivered
     */
    static async markAsDelivered(messageId: number): Promise<void> {
        try {
            await Message.query()
                .patch({ status: constants.messageStatus.Delivered })
                .where('id', messageId)
                .andWhere('status', constants.messageStatus.Sent);
        } catch (error) {
            log.error('markAsDelivered: ', error);
            throw error;
        }
    }

    /**
     * Mark message as read
     */
    static async markAsRead(messageId: number): Promise<void> {
        try {
            await Message.query()
                .patch({
                    status: constants.messageStatus.Read,
                    read_at: new Date()
                })
                .where('id', messageId)
                .whereIn('status', [constants.messageStatus.Sent, constants.messageStatus.Delivered]);
        } catch (error) {
            log.error('markAsRead: ', error);
            throw error;
        }
    }

    /**
     * Get unread message count for a user
     */
    static async getUnreadCount(userId: number): Promise<number> {
        try {
            return await Message.query().where('receiver_id', userId).whereNot('status', constants.messageStatus.Read).resultSize();
        } catch (error) {
            log.error('getUnreadCount: ', error);
            throw error;
        }
    }
}
