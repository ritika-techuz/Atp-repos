export interface SendSMS {
    (to: string, message: string): Promise<void>;
}

export interface SMSProvider {
    sendSMS: SendSMS;
}
