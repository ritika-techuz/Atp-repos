import { describe, expect, it } from '@jest/globals';
import { appConfig } from '../app';

describe('appConfig', () => {
    it('loads application environment variables', () => {
        expect(appConfig.nodeEnv).toEqual(process.env.NODE_ENV || 'development');
        expect(appConfig.appName).toEqual(process.env.APP_NAME);
        expect(appConfig.appPort).toEqual(process.env?.APP_PORT || 4000);
        expect(appConfig.appLogoUrl).toEqual(process.env.APP_LOGO_URL);
        expect(appConfig.logDbQueries).toEqual(
            process.env.DATABASE_LOG_QUERIES ? (process.env.DATABASE_LOG_QUERIES === 'true' ? true : false) : true
        );
        expect(appConfig.allowedHosts).toEqual(process.env.ALLOWED_HOSTS);
        expect(appConfig.isHttps).toEqual(process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? true : false) : true);
        expect(appConfig.appBaseUrl).toEqual(process.env.APP_BASE_URL);
        expect(appConfig.frontendBaseUrl).toEqual(process.env.FRONTEND_BASE_URL);
        expect(appConfig.protocol).toEqual(process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https');
        expect(appConfig.appProtocol).toEqual(process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https');
        expect(appConfig.appHost).toEqual(process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https');
        expect(appConfig.sslKeyPath).toEqual(process.env.SSL_KEY_PATH);
        expect(appConfig.sslCertPath).toEqual(process.env.SSL_CERT_PATH);
    });
});
