import { describe, expect, it } from '@jest/globals';
import { redisConfig } from '../redis';

describe('redisConfig', () => {
    it('loads redis environment variables', () => {
        expect(redisConfig.redisHost).toEqual(process.env.REDIS_HOST);
        expect(redisConfig.redisPort).toEqual(process.env.REDIS_PORT);
        expect(redisConfig.redisPassword).toEqual(process.env.REDIS_PASSWORD);
        expect(redisConfig.redisMaxmemory).toEqual(process.env.REDIS_MAX_MEMORY);
        expect(redisConfig.redisMaxmemoryPolicy).toEqual(process.env.REDIS_MEMORY_POLICY);
    });
});
