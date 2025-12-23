import { appConfig } from '@repo/config';

/**
 * @description Extracts the base URL from a given URL, including protocol and host.
 * @param {string} url The URL to extract the base URL from.
 * @returns {string} The base URL.
 */
export function getBaseUrlFromUrl(url: string = ''): string {
    if (url === '') return appConfig.frontendBaseUrl;
    const pathArray = url.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    return `${protocol}//${host}`;
}
