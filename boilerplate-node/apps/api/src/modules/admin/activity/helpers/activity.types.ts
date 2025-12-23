import { Pagination } from '@repo/utils';

export interface IActivityLogQuery extends Pagination {
    user_id?: number;
    search?: string;
    from_date?: string;
    to_date?: string;
}
