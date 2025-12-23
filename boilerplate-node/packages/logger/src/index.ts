import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import { loggerConfig } from '@repo/config';

const { logLevel, enableFile, logFilePath, maxsize } = loggerConfig;

const logDir = path.dirname(logFilePath);
if (enableFile && !fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

/**
 * @author Jitendra Singh
 * @description Checks if the given metadata object is an array-like object.
 * @param meta - The metadata object to be checked.
 * @returns The length of the array-like object if true, false otherwise.
 */
const isArrayLikeMeta = (meta: Record<string, any>): number | boolean => {
    const keys = Object.keys(meta);
    return keys.length && keys.every(key => /^\d+$/.test(key));
};

/**
 * @author Jitendra Singh
 * @description Builds a formatted JSON string from the provided metadata object.
 * @param meta - The metadata object to be converted to a JSON string.
 * @returns A formatted JSON string representation of the metadata, or an empty string if no metadata is provided.
 */
const buildMetaString = (meta: Record<string, any>): string => {
    if (!meta || Object.keys(meta).length === 0) return '';

    if (isArrayLikeMeta(meta)) {
        const arr = Object.values(meta);
        return `\n${JSON.stringify(arr, null, 2)}`;
    }

    return `\n${JSON.stringify(meta, null, 2)}`;
};

const log = createLogger({
    level: logLevel,
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.errors({ stack: true }), format.splat(), format.json()),
    transports: [
        new transports.Console({
            level: logLevel,
            format: format.combine(
                format.colorize(),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(({ timestamp, level, message, ...meta }) => {
                    const msg = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;

                    const metaString = buildMetaString(meta);
                    return `[${timestamp}] ${level}: ${msg}${metaString}`;
                })
            )
        }),
        ...(enableFile
            ? [
                  new transports.File({
                      filename: logFilePath,
                      level: logLevel,
                      maxsize: maxsize || 5 * 1024 * 1024, // 5MB
                      maxFiles: 5,
                      tailable: true
                      // format: format.combine(
                      //     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                      //     format.printf(({ timestamp, level, message, ...meta }) => {
                      //         const msg = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
                      //         const metaString = buildMetaString(meta);
                      //         return `[${timestamp}] ${level}: ${msg}${metaString}`;
                      //     })
                      // )
                  })
              ]
            : [])
    ],
    exitOnError: false
});

export { log };
