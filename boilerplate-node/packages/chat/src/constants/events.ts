export const SOCKET_EVENTS = {
    // Connection events
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    ERROR: 'error',

    // Room events
    JOIN_ROOM: 'join_room',
    LEAVE_ROOM: 'leave_room',

    // Message events
    SEND_MESSAGE: 'send_message',
    RECEIVE_MESSAGE: 'receive_message',
    MESSAGE_DELIVERED: 'message_delivered',
    MESSAGE_READ: 'message_read',

    // Typing events
    TYPING_START: 'typing_start',
    TYPING_END: 'typing_end',

    // History events
    GET_MESSAGE_HISTORY: 'get_message_history',
    MESSAGE_HISTORY: 'message_history'
} as const;

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;
