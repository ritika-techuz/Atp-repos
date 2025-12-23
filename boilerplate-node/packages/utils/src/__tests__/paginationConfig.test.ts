import { describe, it, expect } from '@jest/globals';
import { defaultPagination } from '../config/pagination';

describe('defaultPagination', () => {
    it('exports the right object', () => {
        expect(defaultPagination).toEqual({
            perPage: 10,
            page: 1,
            orderBy: 'created_at',
            orderDir: 'desc'
        });
    });
});
