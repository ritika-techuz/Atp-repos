import { log } from '@repo/logger';
import { ActivityLog } from '@repo/db';
import { constants } from '@repo/config';
import { IActivityLog } from './helpers/activity.types';

/**
 * @author Jitendra Singh
 * @description Logs an activity by inserting a new record into the Activity Log table.
 */
const createActivityLogService = async (body: IActivityLog): Promise<void> => {
    try {
        body.device_type = body.device_type || constants.deviceType['DESKTOP'];

        await ActivityLog.query().insert(body);

        return;
    } catch (error) {
        log.error('createActivityLogService Catch: ', error);
        throw error;
    }
};

export const activityLogService = {
    createActivityLogService
};
