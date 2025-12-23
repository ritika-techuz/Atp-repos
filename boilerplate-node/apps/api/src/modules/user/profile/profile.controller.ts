import { Request, Response, NextFunction } from 'express';
import { validateFileSize } from '@repo/utils';
import { constants, SupportedProfileImageType } from '@repo/config';
import { StatusCodes, ResponseMessages, sendResponse, CustomError } from '@repo/response-handler';
import { IUser } from './helpers/profile.types';
import { profileService } from './profile.service';

/**
 * @author Jitendra Singh
 * @description Retrieves the profile information for the authenticated user.
 */
const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, language } = req;
        const data = await profileService.getProfileService(user as IUser);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PROFILE.FETCH_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Updates the profile information for the authenticated user.
 */
const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, file, body, language } = req;

        if (file) {
            if (!constants.supportedProfileImageTypes.includes(file.mimetype as SupportedProfileImageType))
                throw new CustomError(ResponseMessages.COMMON.UNSUPPORTED_FILE_TYPE, StatusCodes.UNSUPPORTED_MEDIA_TYPE);
            validateFileSize(file.size, constants.profileImageSize);
        }

        const data = await profileService.updateProfileService(user as IUser, body, file as Express.Multer.File);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PROFILE.UPDATE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Updates the password for the authenticated user.
 */
const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, body, language } = req;
        const data = await profileService.changePasswordService(user as IUser, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PASSWORD.PASSWORD_CANNOT_BE_SAME_AS_CURRENT, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Logs out the authenticated user and updates their `token` to `null`.
 */
const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, body, language } = req;
        await profileService.logoutService(user as IUser, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, null, language);
    } catch (error) {
        next(error);
    }
};

export const profileController = {
    getProfile,
    updateProfile,
    changePassword,
    logout
};
