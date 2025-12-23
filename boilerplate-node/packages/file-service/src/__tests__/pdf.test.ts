import { describe, it, expect } from '@jest/globals';
import { generatePdfFromTemplate } from '../pdf';
import { TemplateNames } from '../pdf/constants/templateConstants';
import { ITemplateDataMap } from '../pdf/types/templateDataTypes';

describe('@repo/file-service/pdf', () => {
    it('prints a message', async () => {
        const data: ITemplateDataMap['TEST'] = {
            customerName: 'Jitendra Singh',
            email: 'jitendra@example.com',
            items: [
                { name: 'Item A', quantity: 2, price: 200 },
                { name: 'Item B', quantity: 1, price: 100 }
            ],
            totalAmount: 300
        };
        const pdfData = await generatePdfFromTemplate(TemplateNames.TEST, data);
        expect(pdfData).toBeInstanceOf(Buffer);
    }, 20000); // 20 seconds
});
