import { describe, it, expect } from '@jest/globals';
import { formatDate } from '../format/date';

describe('Date Formatter', () => {
    it('should format date to YYYY-MM-DD', () => {
        const date = new Date('2024-01-15');
        expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
    });
});
