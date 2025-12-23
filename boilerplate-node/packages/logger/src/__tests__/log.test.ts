import { describe, it, expect, jest } from '@jest/globals';
import { log } from '..';

jest.spyOn(log, 'info');
jest.spyOn(log, 'warn');
jest.spyOn(log, 'error');

describe('@repo/logger', () => {
    it('logs an info message', () => {
        log.info('hello');
        expect(log.info).toBeCalledWith('hello');
    });

    it('logs a warning message', () => {
        log.warn('warning');
        expect(log.warn).toBeCalledWith('warning');
    });

    it('logs an error message', () => {
        log.error('error');
        expect(log.error).toBeCalledWith('error');
    });
});
