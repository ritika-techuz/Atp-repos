import { Request, Response, NextFunction } from 'express';
import { constants, SupportedLanguage } from '@repo/config';

/**
 * @author Jitendra Singh
 * @description Express middleware that sets the language of the request based on the "Accept-Language" header.
 */
export const languageMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    let language = (req.headers['accept-language'] as string) || constants.defaultLanguage;
    if (!constants.supportedLanguages.includes(language as SupportedLanguage)) language = constants.defaultLanguage;
    req.language = language;
    next();
};
