import { UserRecord } from 'firebase-admin/auth';
import { getFirebaseAuth } from './firebase';

/**
 * @description Generates a password reset link for the specified email address using Firebase Authentication.
 * @param {string} email - The email address of the user for whom to generate the password reset link.
 * @param {string} url - The URL to redirect the user to after they reset their password.
 * @returns {Promise<string>} A promise that resolves to the generated password reset link.
 */
const generatePasswordResetLink = async (email: string, url: string): Promise<string> => {
    const actionCodeSettings = {
        url: url,
        handleCodeInApp: true
    };
    return await getFirebaseAuth().generatePasswordResetLink(email, actionCodeSettings);
};

/**
 * @description Retrieves a user's details by their email address using Firebase Authentication.
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<UserRecord>} A promise that resolves to the user's details.
 */
const getUserByEmail = async (email: string): Promise<UserRecord> => {
    return await getFirebaseAuth().getUserByEmail(email);
};

/**
 * @description Updates a user's password using Firebase Authentication.
 * @param {string} uid - The user ID of the user whose password to update.
 * @param {string} password - The new password.
 * @returns {Promise<UserRecord>} A promise that resolves to the updated user's details.
 */
const updateUserPassword = async (uid: string, password: string): Promise<UserRecord> => {
    return await getFirebaseAuth().updateUser(uid, { password });
};

/**
 * Creates a new user in Firebase with email and password.
 * @param email - User's email
 * @param password - User's password
 */
export async function createFirebaseUser(email: string, password: string) {
    const auth = getFirebaseAuth();
    return await auth.createUser({ email, password });
}

export async function isUserExists(email: string): Promise<boolean> {
    try {
        await getFirebaseAuth().getUserByEmail(email);
        return true; // User exists
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            return false; // User doesn't exist
        }
        throw error; // Other errors
    }
}

export const firebaseService = {
    getUserByEmail,
    updateUserPassword,
    generatePasswordResetLink,
    createFirebaseUser,
    isUserExists
};
