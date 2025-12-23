/**
 * @description Formats a given date into a specified string format.
 * @param date - The date object to format.
 * @param format - The desired format of the date string. Defaults to 'YYYY-MM-DD'.
 * @returns A string representing the formatted date.
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return format.replace(/YYYY/, year).replace(/MM/, month).replace(/DD/, day);
}
