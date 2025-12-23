import { describe, it, expect } from '@jest/globals';

import { createNoopProvider } from '../providers/noop';
import { SMSProvider } from '../types';

describe('SMS Providers', () => {
    describe('Noop Provider', () => {
        it('should extract OTP from message and log it', async () => {
            const provider: SMSProvider = createNoopProvider();
            const to = '+1234567890';
            const message = 'Your OTP is 123456';

            const result = await provider.sendSMS(to, message);

            expect(result).toEqual({ otp: '123456' });
        });

        it('should return default OTP if none found in message', async () => {
            const provider = createNoopProvider();
            const to = '+1234567890';
            const message = 'No OTP here';

            const result = await provider.sendSMS(to, message);

            expect(result).toEqual({ otp: '0000' });
        });
    });
});
