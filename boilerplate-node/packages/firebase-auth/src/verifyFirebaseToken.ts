import { Request, Response, NextFunction } from 'express';
import { log } from '@repo/logger';
import { constants } from '@repo/config';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { getFirebaseAuth } from './firebase';

/**
 * @author Jitendra Singh
 * @description Express middleware to verify a Firebase token from the Authorization header.
 * @returns {Promise<void>} When the middleware is done.
 */
export async function verifyFirebaseToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = await getFirebaseAuth().verifyIdToken(token);

        if (decodedToken['firebase']['sign_in_provider'] === 'password') req.body = { ...req.body, auth_type: constants.authType['EMAIL'] };

        if (decodedToken['firebase']['sign_in_provider'] === 'phone') req.body = { ...req.body, auth_type: constants.authType['PHONE'] };

        if (decodedToken['firebase']['sign_in_provider'] === 'google.com') req.body = { ...req.body, auth_type: constants.authType['GOOGLE'] };

        if (decodedToken['firebase']['sign_in_provider'] === 'facebook.com') req.body = { ...req.body, auth_type: constants.authType['FACEBOOK'] };

        if (decodedToken['firebase']['sign_in_provider'] === 'apple.com') req.body = { ...req.body, auth_type: constants.authType['APPLE'] };

        if (
            decodedToken['firebase']['sign_in_provider'] === 'google.com' ||
            decodedToken['firebase']['sign_in_provider'] === 'facebook.com' ||
            decodedToken['firebase']['sign_in_provider'] === 'apple.com'
        ) {
            req.body = {
                ...req.body,
                first_name: decodedToken['name'].split(' ')[0],
                last_name: decodedToken['name'].split(' ')[1],
                profile_url: decodedToken['picture']
            };
        }

        req.body = {
            ...req.body,
            social_id: decodedToken['sub'],
            email: decodedToken['email'],
            mobile_number: decodedToken['phone_number']
        };

        next();
    } catch (error) {
        log.error('Token verification error:', error);
        next(error);
    }
}
