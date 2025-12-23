import { appConfig, mailerConfig } from '@repo/config';
import { transporter } from './transporter';
import { renderTemplate } from './templateRenderer';
import { TEMPLATES, TemplateName } from './templateConstants';

/**
 * @description Sends an email using the configured transporter.
 * @param {string} to - The email address to send the email to.
 * @param {string} subject - The subject of the email.
 * @param {TemplateName} templateName - The name of the email template to render.
 * @param {any} context - The context data to pass to the template renderer.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 */
export async function sendMail(
    to: string,
    subject: string,
    templateName: TemplateName, // templateName is now typed as a valid template from TEMPLATES
    context: any
): Promise<void> {
    // Ensure the templateName is a valid template constant
    if (!Object.values(TEMPLATES).includes(templateName)) throw new Error(`Template ${templateName} not found in TEMPLATES.`);

    // Render the email template based on the selected template
    const html = await renderTemplate(templateName, context);

    // Send the email using the configured transporter
    await transporter.sendMail({
        from: `${appConfig.appName} <${mailerConfig.smtpFromEmail}>`,
        to,
        subject,
        html
    });
}
