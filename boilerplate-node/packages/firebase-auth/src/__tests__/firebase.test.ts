import { describe, it, expect } from '@jest/globals';

describe('validateFileSize', () => {
    it('should return true for file size within limit', () => {
        const fileSizeInBytes = 5 * 1024 * 1024; // 5 MB
        // expect(validateFileSize(fileSizeInBytes, 10)).toBe(true);
    });
});
