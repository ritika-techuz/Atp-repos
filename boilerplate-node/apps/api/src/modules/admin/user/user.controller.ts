import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse, CustomError } from '@repo/response-handler';
import { constants, SupportedProfileImageType } from '@repo/config';
import { validateFileSize } from '@repo/utils';
import { userService } from './user.service';
import { IUserListingFilter } from './helpers/user.types';

/**
 * @author Yagnesh Acharya
 * @description Create user
 */
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { language, body } = req;
        const data = await userService.createUserService(body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.USER.CREATE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Yagnesh Acharya
 * @description Fetch user by id
 */
const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { language, params } = req;
        const data = await userService.getUserByIdService(+params.id);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.USER.FETCH_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Yagnesh Acharya
 * @description Fetch all users
 */
const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { language, query } = req;
        const data = await userService.getAllUserService(query as unknown as IUserListingFilter);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.USER.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Yagnesh Acharya
 * @description Update user
 */
const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { language, body, file } = req;

        if (file) {
            if (!constants.supportedProfileImageTypes.includes(file.mimetype as SupportedProfileImageType))
                throw new CustomError(ResponseMessages.COMMON.UNSUPPORTED_FILE_TYPE, StatusCodes.UNSUPPORTED_MEDIA_TYPE);
            validateFileSize(file.size, constants.profileImageSize);
        }

        const data = await userService.updateUserService(body, file as Express.Multer.File);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.USER.UPDATE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Yagnesh Acharya
 * @description Update user status to inactive and active by id
 */
const updateUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { language, params } = req;
        const data = await userService.updateUserStatusService(+params.id);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.USER.UPDATE_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Yagnesh Acharya
 * @description Delete user by id
 */
const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { language, params } = req;
        const data = await userService.deleteUserService(+params.id);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.USER.ACCOUNT_DELETED, data, language);
    } catch (error) {
        next(error);
    }
};

export const userController = { getUserById, getAllUsers, updateUser, updateUserStatus, deleteUser, createUser };
