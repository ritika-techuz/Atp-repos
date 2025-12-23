import { describe, it, expect } from '@jest/globals';
import { loggerConfig } from '../logger';

describe('loggerConfig', () => {
    it('loads logger environment variables', () => {
        expect(loggerConfig.logLevel).toEqual(process.env.LOG_LEVEL || 'info');
        expect(loggerConfig.enableFile).toEqual(process.env.ENABLE_FILE_LOG === 'true');
        expect(loggerConfig.logFilePath).toEqual(process.env.LOG_FILE_PATH || '../../logs/app.log');
        expect(loggerConfig.pretty).toEqual(process.env.NODE_ENV !== 'production');
        expect(loggerConfig.maxsize).toEqual(+process.env.LOG_FILE_MAX_SIZE! || 5 * 1024 * 1024);
    });
});
