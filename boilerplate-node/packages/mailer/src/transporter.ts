import nodemailer from 'nodemailer';
import { mailerConfig } from '@repo/config';

export const transporter = nodemailer.createTransport({
    host: mailerConfig.smtpHost,
    port: mailerConfig.smtpPort,
    secure: mailerConfig.smtpSecure,
    auth: {
        user: mailerConfig.smtpUser,
        pass: mailerConfig.smtpPass
    }
});
