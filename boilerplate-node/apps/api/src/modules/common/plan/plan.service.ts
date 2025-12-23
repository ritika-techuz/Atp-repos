import { log } from '@repo/logger';
import { Plan } from '@repo/db';
import { constants } from '@repo/config';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { IPlanParams, IPlanQuery } from './helpers/plan.types';

/**
 * @author Jitendra Singh
 * @description Fetches a plan by its ID.
 * @param {IPlanParams} params - The parameters containing the plan ID.
 * @returns {Promise<Plan>} - The plan object with specified attributes if found.
 */
const getPlanService = async (params: IPlanParams): Promise<Plan> => {
    try {
        const { plan_id } = params;
        const planAttributes = [
            'id',
            'name',
            'price_id',
            'price',
            'tax_percentage',
            'type',
            'provider',
            'currency',
            'interval',
            'interval_count',
            'status'
        ];

        const plan = await Plan.query()
            .select(...planAttributes)
            .findById(plan_id);

        if (!plan) throw new CustomError(ResponseMessages.PLAN.NOT_FOUND, StatusCodes.NOT_FOUND);

        return plan;
    } catch (error) {
        log.error('getPlanService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Lists all plans or a single plan by ID with specified attributes.
 * @param {IPlanQuery} query - The query object containing the plan ID and interval.
 * @returns {Promise<Plan[]>} - The array of plan objects with specified attributes if found.
 */
const listPlansService = async (query: IPlanQuery): Promise<Plan[]> => {
    try {
        const { plan_id, interval } = query;
        const planAttributes = [
            'id',
            'name',
            'price_id',
            'price',
            'tax_percentage',
            'features',
            'type',
            'provider',
            'currency',
            'interval',
            'interval_count',
            'status'
        ];

        const planQuery = Plan.query()
            .select(...planAttributes)
            .where('status', constants.status['Active']);

        if (plan_id) planQuery.andWhere('id', plan_id);
        if (interval) planQuery.andWhere('interval', interval);

        const plans = await planQuery;

        return plans;
    } catch (error) {
        log.error('listPlansService Catch: ', error);
        throw error;
    }
};

export const planService = {
    getPlanService,
    listPlansService
};
