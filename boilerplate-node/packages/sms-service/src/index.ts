import { smsConfig } from '@repo/config';
import { SMSProvider } from './types';
import { createNoopProvider } from './providers/noop';
import { createTwilioProvider } from './providers/twillio';

let smsProvider: SMSProvider;

switch (smsConfig.smsProvider) {
    case 'twilio':
        smsProvider = createTwilioProvider(smsConfig.twilioSid!, smsConfig.twilioAuthToken!, smsConfig.twilioPhoneNumber!);
        break;
    default:
        smsProvider = createNoopProvider();
        break;
}

export const sendSMS = smsProvider.sendSMS;
