/**
 * @description Validates a password based on strength requirements.
 * @param password The password string to validate.
 * @returns An object containing validity and error messages.
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) errors.push('Password must be at least 8 characters long.');

    if (!/[A-Z]/.test(password)) errors.push('Password must include at least one uppercase letter.');

    if (!/[a-z]/.test(password)) errors.push('Password must include at least one lowercase letter.');

    if (!/[0-9]/.test(password)) errors.push('Password must include at least one number.');

    if (!/[^A-Za-z0-9]/.test(password)) errors.push('Password must include at least one special character.');

    return { valid: errors.length === 0, errors };
}
