import { log } from '@repo/logger';
import { Plan } from '@repo/db';
import { constants } from '@repo/config';
import { stripeService } from '@repo/stripe';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { ICreatePlanBody, IUpdatePlanBody, IUpdatePlanParams, IUpdatePlanStatusParams } from './helpers/plan.types';

/**
 * @author Jitendra Singh
 * @description Creates a new plan.
 */
const createPlanService = async (body: ICreatePlanBody): Promise<void> => {
    const trx = await Plan.startTransaction();
    try {
        const {
            name,
            price,
            tax_percentage,
            type,
            provider,
            currency = constants.supportedCurrencyType['USD'],
            interval = constants.planInterval['Monthly'],
            status,
            features
        } = body;

        const stripeProduct = await stripeService.createProduct(name, price, currency, interval);

        if (!stripeProduct) throw new CustomError(ResponseMessages.PLAN.CREATE_FAILED, StatusCodes.NOT_FOUND);

        const plan = await Plan.query(trx).insert({
            name,
            price,
            tax_percentage,
            type,
            provider,
            currency,
            interval,
            status,
            features
        });

        await plan.$query(trx).patch({
            price_id: typeof stripeProduct.default_price === 'string' ? stripeProduct.default_price : stripeProduct.default_price?.id
        });

        await trx.commit();
        return;
    } catch (error) {
        await trx.rollback();
        log.error('createPlanService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Updates an existing plan using its ID.
 */
const updatePlanService = async (params: IUpdatePlanParams, body: IUpdatePlanBody): Promise<void> => {
    try {
        const { id } = params;
        const {
            name,
            price,
            tax_percentage,
            type,
            provider,
            currency = constants.supportedCurrencyType['USD'],
            interval = constants.planInterval['Monthly'],
            status,
            features
        } = body;

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

        const planDetails = await Plan.query()
            .select(...planAttributes)
            .findById(id);

        if (!planDetails) throw new CustomError(ResponseMessages.PLAN.NOT_FOUND, StatusCodes.NOT_FOUND);

        const stripeProduct = await stripeService.updateProduct(planDetails.price_id, price, currency, interval);

        if (!stripeProduct) throw new CustomError(ResponseMessages.PLAN.UPDATE_FAILED, StatusCodes.NOT_FOUND);

        await planDetails.$query().patch({
            name,
            price_id: typeof stripeProduct.default_price === 'string' ? stripeProduct.default_price : stripeProduct.default_price?.id,
            price,
            tax_percentage,
            type,
            provider,
            currency,
            interval,
            status,
            features
        });

        return;
    } catch (error) {
        log.error('updatePlanService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Updates the status of a plan by marking it as active or inactive.
 */
const updatePlanStatusService = async (params: IUpdatePlanStatusParams): Promise<void> => {
    try {
        const { id } = params;

        const planAttributes = ['id', 'name', 'price_id', 'price', 'status'];

        const planDetails = await Plan.query()
            .select(...planAttributes)
            .findById(id);

        if (!planDetails) throw new CustomError(ResponseMessages.PLAN.NOT_FOUND, StatusCodes.NOT_FOUND);

        await planDetails.$query().patch({
            status: +planDetails.status === constants.planStatus['Active'] ? constants.planStatus['Inactive'] : constants.planStatus['Active']
        });

        return;
    } catch (error) {
        log.error('updatePlanStatusService Catch: ', error);
        throw error;
    }
};

export const planService = {
    createPlanService,
    updatePlanService,
    updatePlanStatusService
};
