export interface IActivityLog {
    user_id: number;
    activity_id?: number;
    ip_address?: string;
    device_type: number;
    activity_type: number;
}
