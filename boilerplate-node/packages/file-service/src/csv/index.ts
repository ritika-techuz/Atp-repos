import { json2csv } from 'json-2-csv';

/**
 * @author Jitendra Singh
 * @description Converts JSON data to a CSV string
 * @param {object[]} jsonData - the JSON data
 * @returns {Promise<string>} - the CSV data as a string
 */
export async function generateCSV(jsonData: object[]): Promise<string> {
    return json2csv(jsonData, { emptyFieldValue: '' });
}
