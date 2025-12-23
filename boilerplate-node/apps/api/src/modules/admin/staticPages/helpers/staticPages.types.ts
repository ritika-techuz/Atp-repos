import { Pagination } from '@repo/utils';

export interface Params {
    page: string;
}

export interface Schema {
    id?: number;
    page: string;
    content: string;
}

export interface Query extends Pagination {
    search?: string;
}
