import { Request, Response, NextFunction } from 'express';
import { log } from '@repo/logger';
import { appConfig, constants } from '@repo/config';
import { CustomError, sendResponse, StatusCodes, ResponseMessages } from '@repo/response-handler';

/**
 * @author Jitendra Singh
 * @description A custom Express error handler middleware to catch and handle errors.
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    const isCustomError = err instanceof CustomError;
    const statusCode = isCustomError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
    const messageKey = err.message || ResponseMessages.COMMON.ERROR;
    const language = (req as Request).language || constants.defaultLanguage;

    if (appConfig.nodeEnv !== 'development') log.error(`[${statusCode}] ${messageKey}`, err);

    return sendResponse(res, statusCode, messageKey, undefined, language);
};
