export const mailerConfig = {
    smtpFromEmail: process.env.SMTP_FROM_EMAIL!,
    smtpHost: process.env.SMTP_HOST!,
    smtpPort: Number(process.env.SMTP_PORT!),
    smtpUser: process.env.SMTP_USER!,
    smtpPass: process.env.SMTP_PASS!,
    smtpSecure: process.env.SMTP_SECURE === 'true' || false
};
