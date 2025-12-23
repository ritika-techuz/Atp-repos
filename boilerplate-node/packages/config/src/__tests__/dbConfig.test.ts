import { describe, it, expect } from '@jest/globals';
import { dbConfig } from '../db';

describe('dbConfig', () => {
    it('loads database environment variables', () => {
        expect(dbConfig.dbClient).toEqual('mysql');
        expect(dbConfig.dbHost).toEqual(process.env.DATABASE_HOST);
        expect(dbConfig.dbPort).toEqual(process.env.DATABASE_PORT);
        expect(dbConfig.dbUsername).toEqual(process.env.DATABASE_USERNAME);
        expect(dbConfig.dbPassword).toEqual(process.env.DATABASE_PASSWORD);
        expect(dbConfig.dbName).toEqual(process.env.DATABASE_NAME);
    });
});
