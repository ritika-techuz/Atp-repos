import { appConfig } from '@repo/config';
import { getTranslatedMessage } from '@repo/i18n';
import { StatusCodes } from './constants/statusCodes';

/**
 * @description Sends a response with a translated message, data and error stack (for development environment).
 * @param res - The Express response object.
 * @param statusCode - The HTTP status code for the response.
 * @param messageKey - The key for the translated message.
 * @param data - Optional data to be sent in the response body (default is an empty object).
 * @param language - Optional language code for the translated message (default is 'en').
 * @param error - Optional error to be sent in the response body (only for development environment).
 * @returns {Response} The response object that was sent.
 */
export function sendResponse(
    res: any,
    statusCode: number,
    messageKey: string,
    data: any | Record<string, unknown> | null | undefined = null,
    language: string | undefined = 'en',
    error: Error | null = null
): any {
    const success = statusCode >= StatusCodes.SUCCESS && statusCode < StatusCodes.BAD_REQUEST;
    const message = getTranslatedMessage(messageKey, language);

    const response: any = {
        success,
        statusCode,
        message
    };

    if (data) response.data = data;

    if (appConfig.nodeEnv === 'development' && error) response.stack = error.stack;

    return res.status(statusCode).json(response);
}
