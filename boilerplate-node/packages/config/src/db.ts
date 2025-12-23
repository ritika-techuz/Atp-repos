export const dbConfig = {
    dbClient: 'mysql',
    dbHost: process.env.DATABASE_HOST,
    dbPort: process.env.DATABASE_PORT,
    dbUsername: process.env.DATABASE_USERNAME,
    dbPassword: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
    dbCharset: 'utf8mb4'
};
