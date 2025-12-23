import { log } from '@repo/logger';
import { SMSProvider } from '../types';

/**
 * @author Jitendra Singh
 * @description No-operation provider. Returns the OTP instead of sending an SMS.
 */
export function createNoopProvider(): SMSProvider {
    console.log('Creating noop provider');
    const sendSMS = async (to: string, message: string): Promise<any> => {
        const otpMatch = message.match(/\d{4,6}/); // matches 4–6 digit OTP
        const otp = otpMatch ? otpMatch[0] : '0000';

        log.info(`[DEV] OTP for ${to}: ${otp}`);

        return { otp };
    };

    return { sendSMS };
}
