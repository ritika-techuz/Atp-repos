import { describe, beforeAll, beforeEach, it, expect, jest } from '@jest/globals';
import { appConfig, mailerConfig } from '@repo/config';
import { TEMPLATES, TemplateName } from '../templateConstants';

// 1) ESM mocks *before* any other imports
beforeAll(async () => {
    jest.unstable_mockModule('../templateRenderer', () => ({
        renderTemplate: jest.fn<(templateName: TemplateName, context: any) => Promise<string>>()
    }));
    jest.unstable_mockModule('../transporter', () => ({
        transporter: { sendMail: jest.fn() }
    }));
});

// 2) Now dynamically import the mocked modules plus our function under test
let renderTemplate: jest.Mock<(tmpl: TemplateName, ctx: any) => Promise<string>>;
let transporter: { sendMail: jest.Mock };
let sendMail: (to: string, subject: string, tmpl: TemplateName, ctx: any) => Promise<void>;

beforeAll(async () => {
    const templMod = (await import('../templateRenderer')) as unknown as {
        renderTemplate: typeof renderTemplate;
    };
    renderTemplate = templMod.renderTemplate;

    const transMod = (await import('../transporter')) as unknown as {
        transporter: { sendMail: jest.Mock };
    };
    transporter = transMod.transporter;

    ({ sendMail } = await import('../sendMail'));
});

describe('sendMail', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
    });

    it('should send an email with valid template', async () => {
        const tmpl = TEMPLATES.FORGOT_PASSWORD;
        const ctx = { name: 'John', resetLink: 'https://example.com/reset' };
        const subj = 'Password Reset';
        const to = 'user@yopmail.com';

        renderTemplate.mockResolvedValue('<html>Mock</html>');

        await sendMail(to, subj, tmpl, ctx);

        expect(renderTemplate).toHaveBeenCalledWith(tmpl, ctx);
        expect(transporter.sendMail).toHaveBeenCalledWith({
            from: `${appConfig.appName} <${mailerConfig.smtpFromEmail}>`,
            to,
            subject: subj,
            html: '<html>Mock</html>'
        });
    });

    it('should throw for invalid template', async () => {
        const bad = 'nope' as TemplateName;
        await expect(sendMail('a@b.c', 'S', bad, {})).rejects.toThrow(`Template ${bad} not found in TEMPLATES.`);
    });
});
