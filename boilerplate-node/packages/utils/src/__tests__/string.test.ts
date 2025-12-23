import { describe, it, expect } from '@jest/globals';
import { capitalize } from '../format/string';

describe('String Formatter', () => {
    it('should capitalize the first letter of the string', () => {
        expect(capitalize('hello')).toBe('Hello');
    });

    it('should return empty string as is', () => {
        expect(capitalize('')).toBe('');
    });
});
