import { constants } from '@repo/config';
import { CustomError, StatusCodes } from '@repo/response-handler';

/**
 * @description Validates the size of a file in bytes.
 * @param {number | undefined} fileSizeInBytes The size of the file in bytes.
 * @param {number} [maxSizeInMB=constants.defaultFileSize] The maximum allowed size of the file in megabytes.
 * @returns {boolean} True if the file size is valid.
 * @throws {CustomError} If the file size is larger than the maximum allowed size.
 */
export function validateFileSize(fileSizeInBytes: number | undefined, maxSizeInMB: number = constants.defaultFileSize): boolean {
    if (fileSizeInBytes == null) return true;

    const sizeInMB = fileSizeInBytes / (1024 * 1024);
    if (sizeInMB > maxSizeInMB) throw new CustomError(`Max file size is ${maxSizeInMB} MB`, StatusCodes.BAD_REQUEST);

    return true;
}
