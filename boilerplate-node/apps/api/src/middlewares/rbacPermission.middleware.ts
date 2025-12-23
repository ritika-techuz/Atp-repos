import { NextFunction, Request, Response } from 'express';
import { log } from '@repo/logger';
import { constants } from '@repo/config';
import { RBACPermission } from '@repo/db';
import { CustomError, ResponseMessages, StatusCodes } from '@repo/response-handler';

export const checkModuleAccess = (module: string, methods: string[] | string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const moduleList = Array.isArray(methods) ? methods.map(method => `${module}_${method}`) : [`${module}_${methods}`];
            const role = req?.user?.role;
            if (!role) {
                return next(new CustomError(ResponseMessages.AUTH.UNAUTHORIZED, StatusCodes.UNAUTHORIZED));
            }

            const roleName = constants.roleNumberToName[role as keyof typeof constants.roleNumberToName]?.toLowerCase();
            if (!roleName) {
                return next(new CustomError(ResponseMessages.AUTH.ACCESS_DENIED, StatusCodes.FORBIDDEN));
            }

            const permissions = await RBACPermission.query().whereIn('module_name', moduleList).select('module_name', roleName);
            const hasAnyAccess = permissions.some(perm => +(perm[roleName as keyof RBACPermission] || 0) === constants.rolePermissionType.Granted);
            if (!hasAnyAccess) {
                return next(new CustomError(ResponseMessages.AUTH.ACCESS_DENIED, StatusCodes.FORBIDDEN));
            }

            next();
        } catch (error) {
            log.error('Permission check error:', error);
            if (error instanceof CustomError) {
                return next(error);
            }
            return next(new CustomError(ResponseMessages.SERVER.ERROR, StatusCodes.INTERNAL_SERVER_ERROR));
        }
    };
};
