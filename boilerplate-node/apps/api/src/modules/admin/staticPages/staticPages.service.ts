import { log } from '@repo/logger';
import { StaticPages } from '@repo/db';
import { createPagination, PaginationResponse } from '@repo/utils';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { Schema, Query } from './helpers/staticPages.types';

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

/**
 * @author Jainam Shah
 * @description Lists all rows.
 */
const listService = async (queryParams: Query): Promise<PaginationResponse> => {
    try {
        const { search, perPage, page, orderBy, orderDir } = queryParams;
        const startRange = (page - 1) * perPage;
        const endRange = page * perPage - 1;

        const query = await model
            .query()
            .select(...commonAttributes)
            .where(modifyQuery => {
                if (search) modifyQuery.where('page', 'like', `%${search}%`);
            })
            .limit(perPage)
            .range(startRange, endRange)
            .orderBy(orderBy, orderDir);

        const rows = createPagination(query.total, page, perPage, query.results);
        return rows;
    } catch (error) {
        log.error('listService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jainam Shah
 * @description Updates a particular row by its ID.
 */
const createOrUpdateService = async (data: Schema): Promise<StaticPages> => {
    try {
        const row = await model.query().upsertGraph(data);
        return row;
    } catch (error) {
        log.error('updateService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jainam Shah
 * @description Deletes a particular row by its ID.
 */
const removeService = async (page: string): Promise<void> => {
    try {
        const row = await getService(page, ['id']);
        await model.query().deleteById(row.id);
        return;
    } catch (error) {
        log.error('removeService Catch: ', error);
        throw error;
    }
};

export const _service = {
    getService,
    listService,
    createOrUpdateService,
    removeService
};
