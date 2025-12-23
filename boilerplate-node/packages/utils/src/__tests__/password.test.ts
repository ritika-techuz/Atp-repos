import { describe, it, expect } from '@jest/globals';
import { hashPassword, comparePassword } from '../crypto/password';

describe('Password Crypto Utils', () => {
    it('should hash a password and verify it correctly', async () => {
        const password = 'secure123';
        const hash = await hashPassword(password);

        expect(typeof hash).toBe('string');
        const isMatch = await comparePassword(password, hash);
        expect(isMatch).toBe(true);
    });

    it('should fail verification with incorrect password', async () => {
        const password = 'secure123';
        const wrongPassword = 'wrongpass';
        const hash = await hashPassword(password);

        const isMatch = await comparePassword(wrongPassword, hash);
        expect(isMatch).toBe(false);
    });
});
