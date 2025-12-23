import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { storageConfig } from '@repo/config';
import { uploadFile, downloadFile, deleteFile } from '../s3Service';

// Mocking S3 class and commands
jest.mock('@aws-sdk/client-s3', () => {
    class MockS3Client {
        send = jest.fn();
    }
    return {
        S3Client: jest.fn(() => new MockS3Client()),
        PutObjectCommand: jest.fn(),
        GetObjectCommand: jest.fn(),
        DeleteObjectCommand: jest.fn()
    };
});

describe('S3 Service', () => {
    const mockSend = jest.fn(); // Mocking the send method

    // Mocking storageConfig
    const bucketName = storageConfig.s3BucketName;
    const key = 'test-key';
    const body = 'test-body';

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks(); // Use this instead of .mockClear()
    });

    it('uploads a single file', async () => {
        mockSend.mockResolvedValueOnce({} as never); // Mock response with correct type
        const s3Client = new (S3Client as any)({}); // Casting to any to bypass TS error
        (s3Client as any).send = mockSend; // Assign the mockSend to the send method of S3 instance

        // Assuming uploadFile calls send method of S3 with PutObjectCommand
        const result = await uploadFile(s3Client, bucketName, key, body);
        expect(s3Client.send).toHaveBeenCalledWith(expect.any(PutObjectCommand));
        expect(result).toEqual({});
    });

    // it("downloads a single file", async () => {
    //   mockSend.mockResolvedValueOnce({} as never);  // Mock response with correct type
    //   const s3Client = new (S3Client as any)({});  // Casting to any to bypass TS error
    //   (s3Client as any).send = mockSend;  // Assign the mockSend to the send method of S3 instance

    //   // Assuming downloadFile calls send method of S3 with GetObjectCommand
    //   const result = await downloadFile(bucketName, key);
    //   expect(s3Client.send).toHaveBeenCalledWith(expect.any(GetObjectCommand));
    //   expect(result).toEqual({});
    // });

    // it("deletes a single file", async () => {
    //   mockSend.mockResolvedValueOnce({} as never);  // Mock response with correct type
    //   const s3Client = new (S3Client as any)({});  // Casting to any to bypass TS error
    //   (s3Client as any).send = mockSend;  // Assign the mockSend to the send method of S3 instance

    //   // Assuming deleteFile calls send method of S3 with DeleteObjectCommand
    //   const result = await deleteFile(bucketName, key);
    //   expect(s3Client.send).toHaveBeenCalledWith(expect.any(DeleteObjectCommand));
    //   expect(result).toEqual({});
    // });
});
