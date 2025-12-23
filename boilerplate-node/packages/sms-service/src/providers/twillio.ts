import Twilio from 'twilio';
import { SMSProvider } from '../types';

/**
 * @author Jitendra Singh
 * @description Creates an instance of the SMSProvider interface, using the Twilio service to send sms messages.
 * @returns An instance of the SMSProvider interface.
 */
export function createTwilioProvider(accountSid: string, authToken: string, fromPhone: string): SMSProvider {
    const client = Twilio(accountSid, authToken);

    const sendSMS = async (to: string, message: string) => {
        await client.messages.create({
            body: message,
            from: fromPhone,
            to
        });
    };

    return { sendSMS };
}
