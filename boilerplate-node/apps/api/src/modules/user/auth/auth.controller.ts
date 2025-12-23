import { Request, Response, NextFunction } from 'express';
import { getBaseUrlFromUrl } from '@repo/utils';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { authService } from './auth.service';

/**
 * @author Jitendra Singh
 * @description Authenticates a user via social media (Google, Facebook, Apple), email and password, or phone.
 */
const socialSignIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, language } = req;
        const data = await authService.socialSignInService(body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.AUTH.LOGIN_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Forgets the password for the given user and sends a reset password link to the user's email.
 */
const forgetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, language } = req;
        await authService.forgetPasswordService({ ...body, client_base_url: getBaseUrlFromUrl(req.get('Referrer')) });
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PASSWORD.FORGOT_PASSWORD_SUCCESS, null, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Verifies the reset password link for a user.
 */
const verifyResetPasswordLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, language } = req;
        const data = await authService.verifyResetPasswordLinkService({ token: params.token });
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PASSWORD.LINK_VERIFICATION_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Resets the password for a user given a valid reset password link.
 */
const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, body, language } = req;
        const data = await authService.resetPasswordService({ token: params.token }, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PASSWORD.RESET_PASSWORD_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const authController = {
    socialSignIn,
    forgetPassword,
    verifyResetPasswordLink,
    resetPassword
};
