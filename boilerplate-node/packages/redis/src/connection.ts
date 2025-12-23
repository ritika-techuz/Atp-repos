import { createClient, RedisClientType } from 'redis';
import { log } from '@repo/logger';
import { redisConfig } from '@repo/config';

export const redisClient: RedisClientType = createClient({
    url: `redis://:${redisConfig.redisPassword}@${redisConfig.redisHost}:${redisConfig.redisPort}`
});

redisClient.on('error', error => {
    log.error('❌ Redis Client Error: ', error);
});

export default async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        log.info('✅ Redis Connected');

        // await redisClient.configSet('maxmemory', redisConfig.redisMaxmemory);
        // await redisClient.configSet('maxmemory-policy', redisConfig.redisMaxmemoryPolicy);
    }
}
