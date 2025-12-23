export const redisConfig = {
    redisHost: process.env.REDIS_HOST!,
    redisPort: process.env.REDIS_PORT!,
    redisPassword: process.env.REDIS_PASSWORD!,
    redisMaxmemory: process.env.REDIS_MAX_MEMORY!,
    redisMaxmemoryPolicy: process.env.REDIS_MEMORY_POLICY!
};
