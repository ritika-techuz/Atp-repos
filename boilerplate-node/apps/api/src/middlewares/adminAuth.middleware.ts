import { NextFunction, Request, Response } from 'express';
import { User } from '@repo/db';
import { log } from '@repo/logger';
import { jwtUtil } from '@repo/tokens';
import { constants, jwtConfig } from '@repo/config';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { getRedisData, setRedisData } from '@repo/redis';

/**
 * @author Jainam Shah
 * @description Express middleware that authenticates a user based on a JWT token in the request headers.
 */
export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);

    try {
        const decoded = jwtUtil.validateJwt(token);
        if (!decoded) return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);

        let user: User | undefined;
        const data = await getRedisData(token);
        if (data) user = data;
        else {
            const attributes = ['id', 'first_name', 'last_name', 'email', 'profile_url', 'token', 'role', 'status', 'slug'];
            user = await User.query()
                .select(...attributes)
                .findById(decoded.data.id);
        }

        if (!user) return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);
        if (user.token !== token) return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);
        if (+user.role !== constants.role.Admin) {
            return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessages.COMMON.NOT_AUTHENTICATED);
        }

        await setRedisData(token, user, jwtConfig.jwtExpiresIn);
        req.user = user;
        return next();
    } catch (error) {
        log.error(error);
        next(error);
    }
};
