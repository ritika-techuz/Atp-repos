import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    ListObjectsV2Command,
    PutObjectCommandOutput,
    GetObjectCommandOutput,
    DeleteObjectCommandOutput,
    DeleteObjectsCommandOutput
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { log } from '@repo/logger';
import { storageConfig } from '@repo/config';

// Create an S3 client instance to pass explicitly
const s3Client = new S3Client({
    region: storageConfig.s3BucketRegion,
    endpoint: storageConfig.s3BucketEndpoint,
    credentials: {
        accessKeyId: storageConfig.s3BucketAccessKey!,
        secretAccessKey: storageConfig.s3BucketSecretAccessKey!
    }
});

/**
 * @author Jitendra Singh
 * @description Upload a single file to S3.
 */
const uploadFile = async (
    s3Client: S3Client,
    bucketName: string,
    key: string,
    body: Buffer | string | ReadableStream | Blob,
    makePublic: boolean = false
): Promise<PutObjectCommandOutput> => {
    try {
        const result = await s3Client.send(
            new PutObjectCommand({
                ACL: makePublic ? 'public-read' : undefined,
                Bucket: bucketName,
                Key: key,
                Body: body
            })
        );
        return result;
    } catch (error) {
        log.error(`Error uploading file to S3: ${error}`);
        throw new Error(`Failed to upload file to ${bucketName}/${key}`);
    }
};

/**
 * @author Jitendra Singh
 * @description Upload multiple files to S3.
 */
const uploadMultipleFiles = async (
    s3Client: S3Client,
    bucketName: string,
    files: { key: string; body: Buffer | string | ReadableStream | Blob }[],
    makePublic: boolean = false
): Promise<PutObjectCommandOutput[]> => {
    try {
        const uploadPromises = files.map(file =>
            s3Client.send(
                new PutObjectCommand({
                    ACL: makePublic ? 'public-read' : undefined,
                    Bucket: bucketName,
                    Key: file.key,
                    Body: file.body
                })
            )
        );
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        log.error(`Error uploading multiple files to S3: ${error}`);
        throw new Error(`Failed to upload multiple files to ${bucketName}`);
    }
};

/**
 * @author Jitendra Singh
 * @description Download a single file from S3.
 */
const downloadFile = async (s3Client: S3Client, bucketName: string, key: string): Promise<GetObjectCommandOutput> => {
    try {
        const result = await s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: key }));
        return result;
    } catch (error) {
        log.error(`Error downloading file from S3: ${error}`);
        throw new Error(`Failed to download file from ${bucketName}/${key}`);
    }
};

/**
 * @author Jitendra Singh
 * @description Download multiple files from S3.
 */
const downloadMultipleFiles = async (s3Client: S3Client, bucketName: string, keys: string[]): Promise<GetObjectCommandOutput[]> => {
    try {
        const downloadPromises = keys.map(key => s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: key })));
        const results = await Promise.all(downloadPromises);
        return results;
    } catch (error) {
        log.error(`Error downloading multiple files from S3: ${error}`);
        throw new Error(`Failed to download multiple files from ${bucketName}`);
    }
};

/**
 * @author Jitendra Singh
 * @description Delete a single file from S3.
 */
const deleteFile = async (s3Client: S3Client, bucketName: string, key: string): Promise<DeleteObjectCommandOutput> => {
    try {
        const result = await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
        return result;
    } catch (error) {
        log.error(`Error deleting file from S3: ${error}`);
        throw new Error(`Failed to delete file from ${bucketName}/${key}`);
    }
};

/**
 * @author Jitendra Singh
 * @description Delete multiple files from S3.
 */
const deleteMultipleFiles = async (s3Client: S3Client, bucketName: string, keys: string[]): Promise<DeleteObjectsCommandOutput> => {
    try {
        const objectsToDelete = keys.map(key => ({ Key: key }));
        const result = await s3Client.send(new DeleteObjectsCommand({ Bucket: bucketName, Delete: { Objects: objectsToDelete } }));
        return result;
    } catch (error) {
        log.error(`Error deleting multiple files from S3: ${error}`);
        throw new Error(`Failed to delete multiple files from ${bucketName}`);
    }
};

/**
 * @author Jitendra Singh
 * @description Deletes a folder and its contents from S3.
 */
const deleteFolder = async (s3Client: S3Client, bucketName: string, prefix: string): Promise<void> => {
    try {
        const listedObjects = await s3Client.send(new ListObjectsV2Command({ Bucket: bucketName, Prefix: prefix }));

        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            log.warn(`Folder ${prefix} is already empty.`);
            return;
        }

        await s3Client.send(
            new DeleteObjectsCommand({
                Bucket: bucketName,
                Delete: { Objects: listedObjects.Contents.map(content => ({ Key: content.Key! })) }
            })
        );

        log.info(`Folder ${prefix} and its contents deleted.`);
        return;
    } catch (error) {
        log.error(`Error deleting folder from S3: ${error}`);
        throw new Error(`Failed to delete folder ${prefix} from ${bucketName}`);
    }
};

/**
 * @author Jitendra Singh
 * @description Generate a pre-signed URL for downloading a file from S3.
 */
const getPresignedUrl = async (bucketName: string, key: string, expiresIn: number = 3600): Promise<string> => {
    try {
        const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
        const url = await getSignedUrl(s3Client, command, { expiresIn });
        return url;
    } catch (error) {
        log.error(`Error generating presigned URL for ${bucketName}/${key}: ${error}`);
        throw new Error(`Failed to generate presigned URL for ${key}`);
    }
};

export {
    s3Client,
    uploadFile,
    uploadMultipleFiles,
    downloadFile,
    downloadMultipleFiles,
    deleteFile,
    deleteMultipleFiles,
    deleteFolder,
    getPresignedUrl
};
