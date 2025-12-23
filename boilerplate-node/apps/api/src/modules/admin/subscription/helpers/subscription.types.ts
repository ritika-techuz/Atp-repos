import { Pagination } from '@repo/utils';

export interface IListTransactionQuery extends Pagination {
    user_id?: number;
    status?: number;
    payment_status?: number;
    search?: string;
}
