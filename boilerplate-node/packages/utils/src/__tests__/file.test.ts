import { describe, it, expect } from '@jest/globals';
import { CustomError } from '@repo/response-handler';
import { validateFileSize } from '../validation/file';

describe('validateFileSize', () => {
    it('should return true for file size within limit', () => {
        const fileSizeInBytes = 5 * 1024 * 1024; // 5 MB
        expect(validateFileSize(fileSizeInBytes, 10)).toBe(true);
    });

    it('should throw CustomError for file size exceeding limit', () => {
        const fileSizeInBytes = 15 * 1024 * 1024; // 15 MB
        expect(() => validateFileSize(fileSizeInBytes, 10)).toThrow(CustomError);
        expect(() => validateFileSize(fileSizeInBytes, 10)).toThrow(`Max file size is 10 MB`);
    });

    it('should return true for undefined file size', () => {
        expect(validateFileSize(undefined, 10)).toBe(true);
    });
});
