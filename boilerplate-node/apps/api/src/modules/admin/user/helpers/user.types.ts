import { Pagination } from '@repo/utils';

export interface IUserListingFilter extends Pagination {
    status?: number;
    search?: string;
}

export interface IUserUpdateBody {
    id: number;
    first_name: string;
    last_name: string;
    profile_url?: string;
}

export interface IUserCreateBody {
    first_name: string;
    last_name: string;
    email: string;
    role?: number;
    status?: number;
}
