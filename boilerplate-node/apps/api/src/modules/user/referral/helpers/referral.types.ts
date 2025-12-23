import { Pagination } from '@repo/utils';

export interface IReferralQuery extends Pagination {
    user_id?: number;
}
