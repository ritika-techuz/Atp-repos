import 'express';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
    namespace Express {
        export interface Request {
            language?: string;
            user?: {
                id: number;
                stripe_customer_id: string;
                first_name: string;
                last_name: string;
                email: string;
                profile_url: string;
                role: number;
                status: number;
            };
            // file?: File;
        }
    }
}
