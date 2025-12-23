import { CustomError, ResponseMessages, StatusCodes } from '@repo/response-handler';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/events';
import { IJoinRoomPayload } from '../types/notification.types';

export class NotificationHandler {
    private static instance: NotificationHandler;
    private io: Server;

    constructor(io: Server) {
        this.io = io;
        NotificationHandler.instance = this;
        this.setupEventHandlers();
    }

    static getIO(): Server {
        if (!NotificationHandler.instance) {
            throw new CustomError(ResponseMessages.NOTIFICATION.NOTIFICATION_HANDLER_NOT_INITIALIZED, StatusCodes.FORBIDDEN);
        }
        return NotificationHandler.instance.io;
    }

    static async emitNotification(roomId: string, notification: any) {
        if (!NotificationHandler.instance) {
            throw new CustomError(ResponseMessages.NOTIFICATION.NOTIFICATION_HANDLER_NOT_INITIALIZED, StatusCodes.FORBIDDEN);
        }
        NotificationHandler.instance.io.to(roomId).emit(SOCKET_EVENTS.RECEIVE_NOTIFICATION, notification);
    }

    private setupEventHandlers() {
        this.io.on('connection', (socket: Socket) => {
            // Join notification room
            socket.on(SOCKET_EVENTS.JOIN_NOTIFICATION_ROOM, async (payload: IJoinRoomPayload) => {
                await socket.join(payload.room_id);
            });
        });
    }
}
