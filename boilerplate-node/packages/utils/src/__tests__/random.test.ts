import { describe, it, expect } from '@jest/globals';
import { generateRandomNumber, generateRandomString } from '../random';

describe('generateRandomNumber', () => {
    it('should return a number within range', () => {
        const min = 5,
            max = 15;
        const num = generateRandomNumber(min, max);
        expect(num).toBeGreaterThanOrEqual(min);
        expect(num).toBeLessThanOrEqual(max);
    });
});

describe('generateRandomString', () => {
    it('should generate string of correct length', () => {
        const str = generateRandomString(12);
        expect(str.length).toBe(12);
        expect(/^[a-zA-Z0-9]+$/.test(str)).toBe(true);
    });
});
