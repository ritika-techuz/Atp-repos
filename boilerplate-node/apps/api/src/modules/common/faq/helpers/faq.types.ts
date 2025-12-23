import { Pagination } from '@repo/utils';

export interface Query extends Pagination {
    search?: string;
    status?: string;
}
