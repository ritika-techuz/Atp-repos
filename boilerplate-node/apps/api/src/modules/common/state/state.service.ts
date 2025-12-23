import { State } from '@repo/db';
import { log } from '@repo/logger';
import { IStateQuery } from './helpers/state.types';

/**
 * @author Jitendra Singh
 * @description Lists all states for a given country ID.
 */
const listStatesService = async (query: IStateQuery): Promise<State[]> => {
    try {
        const { country_id, search } = query;

        const stateAttributes = ['id', 'name'];
        const stateQuery = State.query()
            .where({ country_id })
            .select(...stateAttributes);
        if (search) stateQuery.where('name', 'like', `%${search}%`);

        const states = await stateQuery;
        return states;
    } catch (error) {
        log.error('listStatesService Catch: ', error);
        throw error;
    }
};

export const stateService = {
    listStatesService
};
