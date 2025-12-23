import { describe, it, expect } from '@jest/globals';
import { generateExcel } from '../excel';

describe('@repo/file-service/excel', () => {
    it('prints a message', async () => {
        const jsonData = [
            {
                name: 'Sheet1',
                data: [
                    { name: 'John', age: 30 },
                    { name: 'Jane', age: 25 }
                ]
            },
            {
                name: 'Sheet2',
                data: [
                    { name: 'Alice', age: 28 },
                    { name: 'Bob', age: 32 }
                ]
            }
        ];
        const excelData = await generateExcel(jsonData);
        expect(excelData).toBeInstanceOf(Buffer);
    });
});
