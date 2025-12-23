import { FAQ } from '@repo/db';
import { log } from '@repo/logger';
import { createPagination, PaginationResponse } from '@repo/utils';
import { Query } from './helpers/faq.types';

const model = FAQ;
const commonAttributes = ['id', 'question', 'answer'];

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

export const _service = {
    listService
};
