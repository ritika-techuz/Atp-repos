import { describe, it, expect, jest, afterAll } from '@jest/globals';
import { log } from '@repo/logger';
import { knex } from '../connection';

describe('@repo/db', () => {
    it('prints a message', async () => {
        const logSpy = jest.spyOn(log, 'info');
        const result = await knex.raw('SELECT 1');
        log.info('DB: ', { rows: result });

        expect(logSpy).toHaveBeenCalledWith('DB: ', { rows: result });
        logSpy.mockRestore();
    });

    afterAll(async () => {
        await knex.destroy();
    });
});
