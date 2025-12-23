import { FAQ } from '@repo/db';
import { log } from '@repo/logger';
import { createPagination, PaginationResponse } from '@repo/utils';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { Query, Schema } from './helpers/faq.types';

const model = FAQ;
const commonAttributes = ['id', 'question', 'answer', 'status'];

/**
 * @author Jainam Shah
 * @description Fetches a row by its ID.
 */
const getService = async (id: number, attributes: string[] = commonAttributes): Promise<FAQ> => {
    try {
        const row = await model
            .query()
            .select(...attributes)
            .findById(id);
        if (!row) throw new CustomError(ResponseMessages.COMMON.NOT_FOUND, StatusCodes.NOT_FOUND);

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
        const { search, status, perPage, page, orderBy, orderDir } = queryParams;
        const startRange = (page - 1) * perPage;
        const endRange = page * perPage - 1;

        const query = await model
            .query()
            .select(...commonAttributes)
            .where(modifyQuery => {
                if (search) {
                    modifyQuery.where(builder => {
                        builder.where('question', 'like', `%${search}%`).orWhere('answer', 'like', `%${search}%`);
                    });
                }
                if (status) modifyQuery.where('status', `${status}`);
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
 * @description Creates a new row.
 */
const createService = async (data: Schema): Promise<FAQ> => {
    try {
        const row = await model.query().insert(data);
        return row;
    } catch (error) {
        log.error('createService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jainam Shah
 * @description Updates a particular row by its ID.
 */
const updateService = async (id: number, data: Schema): Promise<void> => {
    try {
        const row = await getService(id, ['id']);
        await model.query().patch(data).where('id', row.id);
        return;
    } catch (error) {
        log.error('updateService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jainam Shah
 * @description Deletes a particular row by its ID.
 */
const removeService = async (id: number): Promise<void> => {
    try {
        const row = await getService(id, ['id']);
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
    createService,
    updateService,
    removeService
};
