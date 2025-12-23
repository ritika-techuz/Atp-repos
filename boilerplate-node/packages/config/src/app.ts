export const appConfig = {
    nodeEnv: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME,
    appPort: process.env?.APP_PORT || 4000,
    appLogoUrl: process.env.APP_LOGO_URL!,
    logDbQueries: process.env.DATABASE_LOG_QUERIES ? (process.env.DATABASE_LOG_QUERIES === 'true' ? true : false) : true,
    allowedHosts: process.env.ALLOWED_HOSTS,

    isHttps: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? true : false) : false,
    appBaseUrl: process.env.APP_BASE_URL,
    frontendBaseUrl: process.env.FRONTEND_BASE_URL!,
    protocol: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https',
    appProtocol: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https',
    appHost: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https',
    sslKeyPath: process.env.SSL_KEY_PATH!,
    sslCertPath: process.env.SSL_CERT_PATH!,

    chromiumPath: process.env.CHROMIUM_PATH || '/usr/bin/chromium-browser'
};
