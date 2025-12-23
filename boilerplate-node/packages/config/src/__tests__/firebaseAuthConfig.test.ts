import { describe, it, expect } from '@jest/globals';
import { firebaseAuthConfig } from '../firebaseAuth';

describe('firebaseAuthConfig', () => {
    it('loads firebase auth environment variables', () => {
        expect(firebaseAuthConfig.accountType).toEqual(process.env.FIREBASE_AUTH_ACCOUNT_TYPE);
        expect(firebaseAuthConfig.projectId).toEqual(process.env.FIREBASE_AUTH_PROJECT_ID);
        expect(firebaseAuthConfig.privateKeyId).toEqual(process.env.FIREBASE_AUTH_PRIVATE_KEY_ID);
        expect(firebaseAuthConfig.privateKey).toEqual(process.env.FIREBASE_AUTH_PRIVATE_KEY);
        expect(firebaseAuthConfig.clientEmail).toEqual(process.env.FIREBASE_AUTH_CLIENT_EMAIL);
        expect(firebaseAuthConfig.clientId).toEqual(process.env.FIREBASE_AUTH_CLIENT_ID);
        expect(firebaseAuthConfig.authUri).toEqual(process.env.FIREBASE_AUTH_AUTH_URI);
        expect(firebaseAuthConfig.tokenUri).toEqual(process.env.FIREBASE_AUTH_TOKEN_URI);
        expect(firebaseAuthConfig.authProviderX509CertUrl).toEqual(process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL);
        expect(firebaseAuthConfig.clientX509CertUrl).toEqual(process.env.FIREBASE_AUTH_CLIENT_X509_CERT_URL);
        expect(firebaseAuthConfig.universeDomain).toEqual(process.env.FIREBASE_AUTH_UNIVERSE_DOMAIN);
    });
});
