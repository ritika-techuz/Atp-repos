import { ReferralHistory } from '@repo/db';
import { log } from '@repo/logger';
import { createPagination, defaultPagination, PaginationResponse } from '@repo/utils';
import { IReferralQuery } from './helpers/referral.types';

/**
 * @author Sanjay Balai
 * @description Get user's referral history
 */
const getReferralHistoryService = async (params: IReferralQuery): Promise<PaginationResponse> => {
    try {
        const {
            user_id = params.user_id,
            perPage = params.perPage || defaultPagination.perPage,
            page = params.page || defaultPagination.page,
            orderBy = params.orderBy || defaultPagination.orderBy,
            orderDir = defaultPagination.orderDir
        } = params;

        const startRange = (+page - 1) * +perPage;
        const endRange = +page * +perPage - 1;

        const referrals = await ReferralHistory.query()
            .where('referrer_id', user_id!)
            .withGraphFetched('[referrer, referred]')
            .orderBy(orderBy, orderDir)
            .range(startRange, endRange);

        const rows = createPagination(referrals.total, page, perPage, referrals.results);

        return rows;
    } catch (error) {
        log.error('getReferralHistoryService: ', error);
        throw error;
    }
};

export const referralService = {
    getReferralHistoryService
};
