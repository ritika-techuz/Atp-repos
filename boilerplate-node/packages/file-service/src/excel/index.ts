import XLSX from 'xlsx';

export interface ISheetData {
    name: string;
    data: any[];
}

/**
 * @author Jitendra Singh
 * @description Converts JSON data to an Excel buffer (.xlsx format).
 * @param {object[]} jsonData - The JSON data to be converted to Excel.
 * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the Excel data.
 */
export async function generateExcel(jsonData: ISheetData[]): Promise<Buffer> {
    const workbook = XLSX.utils.book_new();

    jsonData.forEach((sheet: ISheetData) => {
        const worksheet = XLSX.utils.json_to_sheet(sheet.data);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
    });

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    return excelBuffer;
}
