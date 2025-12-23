import { log } from '@repo/logger';
import { redisClient } from './connection';

/**
 * @author Jainam Shah
 * @description Get data from Redis.
 */
export async function getRedisData(key: string): Promise<any> {
    try {
        const cached = await redisClient.get(key);
        return cached ? JSON.parse(cached) : undefined;
    } catch (error) {
        log.error('getRedisData Catch: ', error);
        throw error;
    }
}

/**
 * @author Jainam Shah
 * @description Set data in Redis.
 */
export async function setRedisData(key: string, data: unknown, expire: number = 3600): Promise<string> {
    try {
        await redisClient.set(key, JSON.stringify(data), { EX: expire });
        return key;
    } catch (error) {
        log.error('setRedisData Catch: ', error);
        throw error;
    }
}

/**
 * @author Jainam Shah
 * @description Delete data from Redis.
 */
export async function deleteRedisData(key: string): Promise<boolean> {
    try {
        const result = await redisClient.del(key);
        return result > 0;
    } catch (error) {
        log.error('deleteRedisData Catch: ', error);
        throw error;
    }
}

/**
 * @author Jainam Shah
 * @description List all data from Redis.
 */
export async function listRedisData(): Promise<any> {
    try {
        const cached = await redisClient.keys('*');
        return cached;
    } catch (error) {
        log.error('listRedisData Catch: ', error);
        throw error;
    }
}
