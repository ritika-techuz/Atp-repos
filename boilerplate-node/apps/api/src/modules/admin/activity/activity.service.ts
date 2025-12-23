import { log } from '@repo/logger';
import { ActivityLog } from '@repo/db';
import { createPagination, PaginationResponse } from '@repo/utils';
import { IActivityLogQuery } from './helpers/activity.types';

/**
 * @author Jitendra Singh
 * @description Lists all activity logs.
 */
const listActivityLogsService = async (query: IActivityLogQuery): Promise<PaginationResponse> => {
    try {
        const { user_id, from_date, to_date, perPage, page, orderBy, orderDir } = query;
        const startRange = (page - 1) * perPage;
        const endRange = page * perPage - 1;

        const activityLogAttributes = ['id', 'user_id', 'activity_id', 'ip_address', 'device_type', 'activity_type', 'created_at'];

        const activityLogQuery = ActivityLog.query().select(...activityLogAttributes);

        if (user_id) activityLogQuery.where('user_id', user_id);
        if (from_date) activityLogQuery.where('created_at', '>=', from_date);
        if (to_date) activityLogQuery.where('created_at', '<=', to_date);

        const activityLogs = await activityLogQuery.limit(perPage).range(startRange, endRange).orderBy(orderBy, orderDir);

        const paginatedActivityLogs = createPagination(activityLogs.total, page, perPage, activityLogs.results);

        return paginatedActivityLogs;
    } catch (error) {
        log.error('listActivityLogsService Catch: ', error);
        throw error;
    }
};

export const activityLogService = {
    listActivityLogsService
};
