import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

import { jwtConfig } from '@repo/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// For development (src directory)
const devPrivateKeyPath = path.resolve(__dirname, '../../../packages/tokens/src/keys/private.key');
const devPublicKeyPath = path.resolve(__dirname, '../../../packages/tokens/src/keys/public.pub');

// For production (dist directory)
const prodPrivateKeyPath = path.resolve(__dirname, '../keys/private.key');
const prodPublicKeyPath = path.resolve(__dirname, '../keys/public.pub');

const PRIVATE_KEY = fs.existsSync(devPrivateKeyPath) ? fs.readFileSync(devPrivateKeyPath) : fs.readFileSync(prodPrivateKeyPath);

const PUBLIC_KEY = fs.existsSync(devPublicKeyPath) ? fs.readFileSync(devPublicKeyPath) : fs.readFileSync(prodPublicKeyPath);

/**
 * @description Sign a JWT token with the given data.
 * @param {unknown} details The data to encode in the token.
 * @returns {string} The signed token
 */
const signJwt = (details: unknown): string => {
    const token = jwt.sign(
        {
            data: details
        },
        {
            key: PRIVATE_KEY,
            passphrase: jwtConfig.jwtSecret
        },
        {
            algorithm: 'RS256',
            expiresIn: jwtConfig.jwtExpiresIn
        }
    );

    return token;
};

/**
 * @description Validates a given JWT token using the public key.
 * @param {string} [token=''] The JWT token to verify.
 * @returns {any} The decoded token if valid, otherwise throws an error.
 */
const validateJwt = (token: string = '' as string): any => {
    return jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
};

export const jwtUtil = {
    signJwt,
    validateJwt
};
