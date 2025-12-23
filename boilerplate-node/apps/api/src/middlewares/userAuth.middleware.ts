import { NextFunction, Request, Response } from 'express';
import { User } from '@repo/db';
import { log } from '@repo/logger';
import { jwtUtil } from '@repo/tokens';
import { constants } from '@repo/config';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';

/**
 * @author Jitendra Singh
 * @description Express middleware that authenticates a user based on a JWT token in the request headers.
 */
export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);

    try {
        const decoded = jwtUtil.validateJwt(token);
        if (!decoded) return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);

        const attributes = ['id', 'stripe_customer_id', 'first_name', 'last_name', 'email', 'profile_url', 'token', 'role', 'status'];
        let user = await User.query()
            .select(...attributes)
            .findById(decoded.data.id);

        if (!user) return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);
        if (user.token !== token) return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);
        if (+user.status !== constants.status.Active) {
            return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);
        }

        req.user = user;
        return next();
    } catch (error) {
        log.error(error);
        next(error);
    }
};
