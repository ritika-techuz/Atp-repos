import { describe, it, expect } from '@jest/globals';
import { getTranslatedMessage } from '../index';

describe('getTranslatedMessage', () => {
    it('should return correct translation for valid key and language', () => {
        const result = getTranslatedMessage('common.success', 'en');
        expect(result).toBe('Success');
    });
});
