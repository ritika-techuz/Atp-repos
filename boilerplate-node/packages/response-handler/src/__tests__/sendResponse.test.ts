import { describe, it, expect, jest } from '@jest/globals';
import { sendResponse } from '../sendResponse';
import { ResponseMessages } from '../constants/responseMessages';
import { StatusCodes } from '../constants/statusCodes';

describe('sendResponse', () => {
    it('should send a response with translated message', () => {
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const language = 'en';
        const statusCode = StatusCodes.SUCCESS;
        const messageKey = ResponseMessages.COMMON.SUCCESS;

        sendResponse(mockRes as any, statusCode, messageKey, null, language);

        expect(mockRes.status).toHaveBeenCalledWith(statusCode);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            statusCode,
            message: 'Success'
        });
    });
});
