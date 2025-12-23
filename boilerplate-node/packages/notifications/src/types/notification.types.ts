export interface INotification {
    id: number;
    receiver_type: number;
    receiver_id: number;
    room_id: string;
    title: string;
    description: string;
    redirection_type?: string;
    redirection_url?: string;
    type: string;
    is_read: number;
    created_at: Date;
    updated_at: Date;
}

export interface ISendNotificationPayload {
    receiver_type: number;
    receiver_id: number;
    title: string;
    description: string;
    redirection_type?: string;
    redirection_url?: string;
    type: string;
}

export interface INotificationHistoryParams {
    receiver_type: number;
    receiver_id: number;
    page?: number;
    limit?: number;
    is_read?: boolean;
}

export interface IPaginatedNotifications {
    notifications: INotification[];
    total: number;
    page: number;
    limit: number;
    has_more: boolean;
}

export interface IJoinRoomPayload {
    room_id: string;
}
