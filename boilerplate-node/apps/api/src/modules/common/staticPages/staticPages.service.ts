import { log } from '@repo/logger';
import { StaticPages } from '@repo/db';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';

const model = StaticPages;
const commonAttributes = ['id', 'page', 'content'];

/**
 * @author Jainam Shah
 * @description Fetches a row by its ID.
 */
const getService = async (page: string, attributes: string[] = commonAttributes): Promise<StaticPages> => {
    try {
        const row = await model
            .query()
            .select(...attributes)
            .where('page', page)
            .first();
        if (!row) throw new CustomError(ResponseMessages.STATIC_PAGES.NOT_FOUND, StatusCodes.NOT_FOUND);

        return row;
    } catch (error) {
        log.error('getService Catch: ', error);
        throw error;
    }
};

export const _service = {
    getService
};
