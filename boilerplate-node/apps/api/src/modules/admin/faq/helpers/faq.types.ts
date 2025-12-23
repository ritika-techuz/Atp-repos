import { Pagination } from '@repo/utils';

export interface Params {
    id: number;
}

export interface Query extends Pagination {
    search?: string;
    status?: Status;
}

export interface Status {
    ACTIVE: '1';
    INACTIVE: '2';
}

export interface Schema {
    question: string;
    answer: string;
    status?: number;
}
