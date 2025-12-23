import en from './locales/en.json';
import fr from './locales/fr.json';

type TranslationObject = {
    [key: string]: string | TranslationObject;
};

const translations: Record<string, TranslationObject> = {
    en,
    fr
};

/**
 * @description Retrieves a translated message for a given key and language.
 * @param key - The key for the message to be translated, represented in dot notation.
 * @param language - The language code for the translation (default is 'en').
 * @returns The translated message if found, otherwise returns the original key.
 */
export function getTranslatedMessage(key: string, language: string = 'en') {
    return (
        key.split('.').reduce((obj: TranslationObject | string | undefined, part) => {
            if (typeof obj === 'object' && obj !== null) {
                return obj[part];
            }
            return undefined;
        }, translations[language]) || key
    );
}
