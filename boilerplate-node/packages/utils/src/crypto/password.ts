import * as bcrypt from 'bcryptjs';

/**
 * @description Hashes a plain-text password using bcrypt.
 * @param {string} password - The plain-text password to hash.
 * @returns {Promise<string>} A Promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * @description Compares a plain-text password with a hashed password.
 * @param {string} password - The plain-text password to compare.
 * @param {string} hash - The hashed password to compare against.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether the passwords match.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}
