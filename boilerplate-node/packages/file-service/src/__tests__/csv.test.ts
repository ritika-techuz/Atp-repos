import { describe, it, expect } from '@jest/globals';
import { generateCSV } from '../csv';

describe('@repo/file-service/csv', () => {
    it('prints a message', async () => {
        const jsonData = [
            { name: 'John', age: 30 },
            { name: 'Jane', age: 25 }
        ];
        const csvData = await generateCSV(jsonData);
        expect(csvData).toBe(`name,age\nJohn,30\nJane,25`);
    });
});
