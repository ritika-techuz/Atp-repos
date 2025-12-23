import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { verifyFirebaseToken } from '@repo/firebase-auth';
import { authController } from './auth.controller';
import { authValidation } from './helpers/auth.validation';

const router: Router = Router();

router.post('/social-signin', verifyFirebaseToken, validateRequest(authValidation.socialSignInSchema), authController.socialSignIn);

router.post('/forget-password', validateRequest(authValidation.forgetPasswordSchema), authController.forgetPassword);

router.get(
    '/verify-reset-password-link/:token',
    validateRequest(authValidation.verifyResetPasswordLinkSchema),
    authController.verifyResetPasswordLink
);

router.patch('/reset-password/:token', validateRequest(authValidation.resetPasswordSchema), authController.resetPassword);

export const authRoutes = router;
