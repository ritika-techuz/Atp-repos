import { initializeApp, cert, App } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { firebaseAuthConfig } from '@repo/config';

let firebaseApp: App | undefined;

/**
 * @author Jitendra Singh
 * @description Initializes and returns the Firebase App instance.
 * @returns {App} The initialized Firebase App instance.
 */
export function initFirebase(): App {
    if (!firebaseApp) {
        firebaseApp = initializeApp({
            credential: cert({
                type: firebaseAuthConfig.accountType,
                project_id: firebaseAuthConfig.projectId,
                private_key_id: firebaseAuthConfig.privateKeyId,
                private_key: firebaseAuthConfig.privateKey.replace(/\\n/g, '\n'),
                client_email: firebaseAuthConfig.clientEmail,
                client_id: firebaseAuthConfig.clientId,
                auth_uri: firebaseAuthConfig.authUri,
                token_uri: firebaseAuthConfig.tokenUri,
                auth_provider_x509_cert_url: firebaseAuthConfig.authProviderX509CertUrl,
                client_x509_cert_url: firebaseAuthConfig.clientX509CertUrl,
                universe_domain: firebaseAuthConfig.universeDomain
            } as any)
        });
    }
    return firebaseApp;
}

/**
 * @author Jitendra Singh
 * @description Gets the Firebase Auth instance.
 * @returns {import('firebase-admin/auth').Auth} The Firebase Auth instance.
 */
export function getFirebaseAuth(): Auth {
    if (!firebaseApp) initFirebase();
    return getAuth(firebaseApp!);
}
