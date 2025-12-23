export interface Pagination {
    perPage: number;
    page: number;
    orderBy: string;
    orderDir: 'asc' | 'desc';
}

export const defaultPagination: Pagination = {
    page: 1,
    perPage: 10,
    orderBy: 'created_at',
    orderDir: 'desc'
};

const getPageNumber = (pageNumber: number): number | null => {
    if (pageNumber > 0) {
        if (pageNumber === 1) return null;
        else return pageNumber - 1;
    }
    return null;
};

export const createPagination = (total: number, page: number, perPage: number, result?: Array<unknown>): PaginationResponse => {
    const pages = Math.ceil(total / perPage);
    return {
        result,
        pagination: { page: +page, perPage: +perPage, total, prev: getPageNumber(+page), next: +page < pages ? +page + 1 : null }
    };
};

export interface PaginationResponse {
    result: unknown[] | undefined;
    pagination: {
        page: number;
        perPage: number;
        total: number;
        prev: number | null;
        next: number | null;
    };
}
