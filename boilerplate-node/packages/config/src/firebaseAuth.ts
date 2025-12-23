export const firebaseAuthConfig = {
    accountType: process.env.FIREBASE_AUTH_ACCOUNT_TYPE,
    projectId: process.env.FIREBASE_AUTH_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_AUTH_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_AUTH_PRIVATE_KEY!,
    clientEmail: process.env.FIREBASE_AUTH_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_AUTH_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_AUTH_URI,
    tokenUri: process.env.FIREBASE_AUTH_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_AUTH_CLIENT_X509_CERT_URL,
    universeDomain: process.env.FIREBASE_AUTH_UNIVERSE_DOMAIN
};
