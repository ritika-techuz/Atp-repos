import { describe, it, expect } from '@jest/globals';
import { validatePassword } from '../validation/password';

describe('validatePassword', () => {
    it('should return valid for a strong password', () => {
        const result = validatePassword('StrongP@ssw0rd');
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should fail if password is too short', () => {
        const result = validatePassword('S@1a');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Password must be at least 8 characters long.');
    });

    it('should fail if missing uppercase letter', () => {
        const result = validatePassword('weak@123');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Password must include at least one uppercase letter.');
    });

    it('should fail if missing lowercase letter', () => {
        const result = validatePassword('WEAK@123');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Password must include at least one lowercase letter.');
    });

    it('should fail if missing number', () => {
        const result = validatePassword('Weak@word');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Password must include at least one number.');
    });

    it('should fail if missing special character', () => {
        const result = validatePassword('Weak1234');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Password must include at least one special character.');
    });

    it('should return all errors for an empty string', () => {
        const result = validatePassword('');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Password must be at least 8 characters long.');
        expect(result.errors).toContain('Password must include at least one uppercase letter.');
        expect(result.errors).toContain('Password must include at least one lowercase letter.');
        expect(result.errors).toContain('Password must include at least one number.');
        expect(result.errors).toContain('Password must include at least one special character.');
    });
});
