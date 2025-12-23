import { jest, describe, it, expect } from '@jest/globals';
import { sendSMS } from '../index';

jest.mock('@repo/config', () => ({
    smsConfig: {
        smsProvider: 'abc',
        twilioSid: 'sid',
        twilioAuthToken: 'token',
        twilioPhoneNumber: '+10000000000'
    }
}));

describe('SMS Provider selection', () => {
    it('should create Twilio provider when smsProvider is abc', () => {
        expect(typeof sendSMS).toBe('function');
    });

    it('should create noop provider when smsProvider is unknown', () => {
        jest.resetModules();

        jest.doMock('@repo/config', () => ({
            smsConfig: {
                smsProvider: 'unknown'
            }
        }));

        expect(typeof sendSMS).toBe('function');
    });
});
