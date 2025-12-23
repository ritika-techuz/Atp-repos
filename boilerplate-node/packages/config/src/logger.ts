export const loggerConfig = {
    logLevel: process.env.LOG_LEVEL || 'info',
    enableFile: process.env.ENABLE_FILE_LOG === 'true',
    logFilePath: process.env.LOG_FILE_PATH || '../../logs/app.log',
    pretty: process.env.NODE_ENV !== 'production',
    maxsize: +process.env.LOG_FILE_MAX_SIZE! || 5 * 1024 * 1024 // 5MB
};
