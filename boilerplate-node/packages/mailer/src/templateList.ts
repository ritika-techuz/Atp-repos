import fs from 'fs';
import path from 'path';

const templatesDir = path.join(__dirname, 'templates');

/**
 * @description Returns a list of available email template names.
 * @returns a list of template names (without the .ejs extension)
 */
export function listAvailableTemplates(): string[] {
    return fs
        .readdirSync(templatesDir)
        .filter(file => file.endsWith('.ejs') && !file.startsWith('layouts/'))
        .map(file => file.replace('.ejs', ''));
}
