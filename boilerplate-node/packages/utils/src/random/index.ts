/**
 * @description Generates a random number between min (inclusive) and max (inclusive).
 * @param {number} min The minimum number (inclusive) to generate.
 * @param {number} max The maximum number (inclusive) to generate.
 * @returns {number} A random number between min and max.
 */
export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @description Generates a random string of specified length using alphanumeric characters.
 * @param {number} length The desired length of the random string.
 * @returns {string} A random alphanumeric string of the specified length.
 */
export function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

/**
 * @description Generates a random password of atleast one uppercase , lowercase , numeric and any special character.
 * @returns {string} A random alphanumeric password of specified length (by default length is 8).
 */
export function generateValidPassword(length: number = 8) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,20}$/;
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChar = '@';

    let password;
    do {
        const getRandomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)];
        const randomString = [
            getRandomChar(upperChars),
            getRandomChar(numbers),
            specialChar,
            ...Array.from({ length }, () => getRandomChar(upperChars + lowerChars + numbers + specialChar))
        ];
        password = randomString.sort(() => Math.random() - 0.5).join('');
    } while (!passwordRegex.test(password));

    return password;
}
