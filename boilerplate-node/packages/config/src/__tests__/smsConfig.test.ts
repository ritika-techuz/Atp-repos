import { describe, it, expect } from '@jest/globals';
import { smsConfig } from '../sms';

describe('smsConfig', () => {
    it('loads sms environment variables', () => {
        expect(smsConfig.smsProvider).toEqual(process.env.SMS_PROVIDER);
        expect(smsConfig.twilioSid).toEqual(process.env.TWILIO_SID);
        expect(smsConfig.twilioAuthToken).toEqual(process.env.TWILIO_AUTH_TOKEN);
        expect(smsConfig.twilioPhoneNumber).toEqual(process.env.TWILIO_PHONE_NUMBER);
    });
});
