import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { redisClient } from '../connection';
import connectRedis from '../connection';

describe('Redis Connection', () => {
    beforeAll(async () => {
        await connectRedis();
    });

    afterAll(async () => {
        if (redisClient.isOpen) {
            await redisClient.quit();
        }
    });

    it('should connect to Redis successfully', () => {
        expect(redisClient.isOpen).toBe(true);
    });
});
