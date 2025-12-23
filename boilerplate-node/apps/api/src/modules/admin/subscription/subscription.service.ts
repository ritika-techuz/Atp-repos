import { log } from '@repo/logger';
import { UserSubscription } from '@repo/db';
import { createPagination, PaginationResponse } from '@repo/utils';
import { IListTransactionQuery } from './helpers/subscription.types';

/**
 * @author Jitendra Singh
 * @description Lists all transactions with pagination.
 */
const listTransactionService = async (query: IListTransactionQuery): Promise<PaginationResponse> => {
    try {
        const { user_id, status, payment_status, perPage, page, orderBy, orderDir } = query;
        const startRange = (page - 1) * perPage;
        const endRange = page * perPage - 1;

        const transactionAttributes = [
            'id',
            'user_id',
            'price_id',
            'subscription_id',
            'subscription_item_id',
            'invoice_url',
            'invoice_number',
            'price',
            'discount_amount',
            'tax_percentage',
            'tax_amount',
            'sub_total',
            'grand_total',
            'start_date',
            'expiry_date',
            'is_switch',
            'is_cancelled',
            'is_added_by_cron',
            'provider',
            'payment_status',
            'status'
        ];

        const subscriptionQuery = UserSubscription.query().select(...transactionAttributes);

        if (user_id) subscriptionQuery.where('user_id', user_id);

        if (status) subscriptionQuery.where('status', status);

        if (payment_status) subscriptionQuery.where('payment_status', payment_status);

        const subscriptions = await subscriptionQuery.limit(perPage).range(startRange, endRange).orderBy(orderBy, orderDir);

        const paginatedSubscriptions = createPagination(subscriptions.total, page, perPage, subscriptions.results);

        return paginatedSubscriptions;
    } catch (error) {
        log.error('listTransactionService Catch: ', error);
        throw error;
    }
};

export const subscriptionService = {
    listTransactionService
};
