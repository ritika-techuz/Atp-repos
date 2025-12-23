export interface INotificationQuery {
    recordPerPage?: number;
    pageNumber?: number;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
    startRange?: number;
    endRange?: number;
}

export interface INotificationMarkAsRead {
    id: number;
}

export interface INotificationCount {
    receiverType: string;
    receiverId: number;
}
