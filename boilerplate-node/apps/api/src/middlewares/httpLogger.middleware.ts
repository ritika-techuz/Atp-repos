import { Request, Response, NextFunction } from 'express';
import onFinished from 'on-finished';
import { log } from '@repo/logger';

/**
 * @author Jitendra Singh
 * @description Creates an Express middleware that logs each request.
 * @returns a middleware function that logs each request
 */
export const httpLogger = (skip?: (req: Request) => boolean): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const startTime = process.hrtime();

        if (skip?.(req)) return next();

        onFinished(res, () => {
            const diff = process.hrtime(startTime);
            const responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
            const logMessage = `[${req.ip}] [${res.statusCode}] ${req.method} ${req.originalUrl} - ${responseTime} ms`;
            log.info(logMessage);
        });

        next();
    };
};
