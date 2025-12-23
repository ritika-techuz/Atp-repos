import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import puppeteer, { type Browser, executablePath } from 'puppeteer';

import { log } from '@repo/logger';
import { appConfig } from '@repo/config';
import { CustomError, StatusCodes } from '@repo/response-handler';
import { TemplateFileMap, TemplateKey } from './constants/templateConstants';
import { ITemplateDataMap } from './types/templateDataTypes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @author Jitendra Singh
 * @description Generates a PDF from an EJS template.
 * @param templateName - The key of the EJS template to use.
 * @param data - The data to pass to the EJS template.
 * @returns A promise that resolves to a Buffer containing the generated PDF.
 */
export async function generatePdfFromTemplate<T extends TemplateKey>(templateName: T, data: ITemplateDataMap[T]): Promise<Buffer> {
    let browser: Browser | null = null;
    try {
        const templateFilename = TemplateFileMap[templateName];

        if (!templateFilename) throw new CustomError(`Invalid template name: ${templateName}`, StatusCodes.BAD_REQUEST);

        const templatePath = path.resolve(__dirname, 'templates', templateFilename);
        const htmlTemplate = await fs.readFile(templatePath, 'utf-8');
        const html = ejs.render(htmlTemplate, data);

        browser = await puppeteer.launch({
            // executablePath: appConfig.chromiumPath || '/usr/bin/chromium-browser',
            executablePath: executablePath(),
            headless: true
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({ format: 'A4' });
        return Buffer.from(pdfBuffer);
    } catch (error) {
        log.error('generatePdfFromEjs Catch: ', error);
        throw error;
    } finally {
        if (browser) await browser.close();
    }
}
