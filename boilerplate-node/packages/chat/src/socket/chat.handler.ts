import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/events';
import { ChatService } from '../services/chat.service';
import { IJoinRoomPayload, IMessageHistoryParams, ISendMessagePayload } from '../types/message.types';

/**
 * @author Sanjay Balai
 * @description ChatHandler class for handling chat events
 */

export class ChatHandler {
    private io: Server;
    private typingUsers: Map<number, Set<number>> = new Map(); // Map<userId, Set<typingToUserId>>

    constructor(io: Server) {
        this.io = io;
        this.setupEventHandlers();
    }

    private setupEventHandlers(): void {
        this.io.on(SOCKET_EVENTS.CONNECT, (socket: Socket) => {
            // Join room event
            socket.on(SOCKET_EVENTS.JOIN_ROOM, async (payload: IJoinRoomPayload) => {
                await this.handleJoinRoom(socket, payload.room_id);
            });

            // Leave room event
            socket.on(SOCKET_EVENTS.LEAVE_ROOM, (payload: IJoinRoomPayload) => {
                this.handleLeaveRoom(socket, payload.room_id);
            });

            // Send message event
            socket.on(SOCKET_EVENTS.SEND_MESSAGE, async (payload: ISendMessagePayload) => {
                await this.handleSendMessage(socket, payload);
            });

            // Message delivered event
            socket.on(SOCKET_EVENTS.MESSAGE_DELIVERED, async (messageId: number) => {
                await this.handleMessageDelivered(messageId);
            });

            // Message read event
            socket.on(SOCKET_EVENTS.MESSAGE_READ, async (messageId: number) => {
                await this.handleMessageRead(messageId);
            });

            // Typing events
            socket.on(SOCKET_EVENTS.TYPING_START, (userId: number, roomId: string) => {
                this.handleTypingStart(socket, userId, roomId);
            });

            socket.on(SOCKET_EVENTS.TYPING_END, (userId: number, roomId: string) => {
                this.handleTypingEnd(socket, userId, roomId);
            });

            // Get message history
            socket.on(SOCKET_EVENTS.GET_MESSAGE_HISTORY, async (params: IMessageHistoryParams) => {
                await this.handleGetMessageHistory(socket, params);
            });

            // Disconnect event
            socket.on(SOCKET_EVENTS.DISCONNECT, () => {
                this.handleDisconnect(socket);
            });
        });
    }

    private async handleJoinRoom(socket: Socket, roomId: string): Promise<void> {
        await socket.join(roomId);
    }

    private handleLeaveRoom(socket: Socket, roomId: string): void {
        socket.leave(roomId);
    }

    private async handleSendMessage(socket: Socket, payload: ISendMessagePayload): Promise<void> {
        try {
            // Save message to database
            const message = await ChatService.sendMessage(payload);

            // Emit to receiver's room
            const receiverRoom = payload.room_id;
            this.io.to(receiverRoom).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, message);

            // // Emit back to sender for confirmation
            // socket.emit(SOCKET_EVENTS.RECEIVE_MESSAGE, message);
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit(SOCKET_EVENTS.ERROR, 'Failed to send message');
        }
    }

    private async handleMessageDelivered(messageId: number): Promise<void> {
        try {
            await ChatService.markAsDelivered(messageId);
            // You might want to emit an event to notify the sender
        } catch (error) {
            console.error('Error marking message as delivered:', error);
        }
    }

    private async handleMessageRead(messageId: number): Promise<void> {
        try {
            await ChatService.markAsRead(messageId);
            // You might want to emit an event to notify the sender
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    }

    private handleTypingStart(socket: Socket, userId: number, roomId: string): void {
        const receiverRoom = roomId;
        this.io.to(receiverRoom).emit(SOCKET_EVENTS.TYPING_START, userId);
    }

    private handleTypingEnd(socket: Socket, userId: number, roomId: string): void {
        const receiverRoom = roomId;
        this.io.to(receiverRoom).emit(SOCKET_EVENTS.TYPING_END, userId);
    }

    private async handleGetMessageHistory(socket: Socket, params: IMessageHistoryParams): Promise<void> {
        try {
            const history = await ChatService.getMessageHistory(params);
            socket.emit(SOCKET_EVENTS.MESSAGE_HISTORY, history);
        } catch (error) {
            console.error('Error getting message history:', error);
            socket.emit(SOCKET_EVENTS.ERROR, 'Failed to get message history');
        }
    }

    private handleDisconnect(socket: Socket): void {
        // Clean up any typing indicators or other state
    }
}
