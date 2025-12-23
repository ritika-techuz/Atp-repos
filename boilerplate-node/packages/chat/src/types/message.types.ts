export interface IMessage {
    id: number;
    sender_id: number;
    receiver_id: number;
    room_id?: string;
    message: string;
    attachment_url?: string;
    status: number;
    read_at?: Date;
    created_at: Date;
    updated_at: Date;
}

export interface ISendMessagePayload {
    sender_id: number;
    receiver_id: number;
    message: string;
    attachment_url?: string;
    room_id: string;
}

export interface IMessageHistoryParams {
    user_id: number;
    other_user_id: number;
    before_date?: Date;
    recordPerPage?: number;
    pageNumber?: number;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
    startRange?: number;
    endRange?: number;
}

export interface IPaginatedMessages {
    messages: IMessage[];
    total: number;
    page: number;
    limit: number;
    has_more: boolean;
}

export interface IJoinRoomPayload {
    room_id: string;
}
