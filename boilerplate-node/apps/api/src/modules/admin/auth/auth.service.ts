import { User } from '@repo/db';
import { log } from '@repo/logger';
import { jwtUtil } from '@repo/tokens';
import { constants } from '@repo/config';
import { firebaseService } from '@repo/firebase-auth';
import { sendMail, SUBJECTS, TEMPLATES } from '@repo/mailer';
import { generateRandomString, hashPassword } from '@repo/utils';
import { StatusCodes, ResponseMessages, CustomError } from '@repo/response-handler';
import { activityLogService } from '../../common/activity/activity.service';
import {
    IForgetPasswordBody,
    IResetPasswordBody,
    IResetPasswordParams,
    ISocialSignInBody,
    ISocialSignInResponse,
    IVerifyResetPasswordLinkParams,
    IVerifyResetPasswordLinkResponse
} from './helpers/auth.types';

/**
 * @author Jitendra Singh
 * @description Authenticates a user via social media (Google, Facebook, Apple), email and password, or phone.
 * @returns {Promise<ISocialSignInResponse>} - The user's token and login details.
 */
const socialSignInService = async (body: ISocialSignInBody): Promise<ISocialSignInResponse> => {
    const trx = await User.startTransaction();
    try {
        const { social_id, device_type } = body;

        const userAttributes = ['id', 'social_id', 'first_name', 'last_name', 'email', 'mobile_number', 'auth_type', 'role', 'status'];

        const userDetails = await User.query()
            .select(...userAttributes)
            .where({ social_id: social_id, role: constants.role['Admin'] })
            .first();

        if (!userDetails) throw new CustomError(ResponseMessages.AUTH.INVALID_CREDENTIALS, StatusCodes.BAD_REQUEST);

        const data = {
            id: userDetails.id,
            name: userDetails.fullname,
            email: userDetails.email,
            mobile_number: userDetails.mobile_number,
            role: userDetails.role,
            status: userDetails.status
        };

        const token = jwtUtil.signJwt(data);
        await userDetails.$query(trx).patch({ token: token });

        await activityLogService.createActivityLogService({
            user_id: userDetails.id,
            device_type: device_type || constants.deviceType['DESKTOP'],
            activity_type: constants.activityType['LOGIN']
        });

        await trx.commit();

        return { token, loginDetails: data };
    } catch (error) {
        await trx.rollback();
        log.error('socialSignInService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Forgets the password for the given user and sends a reset password link to the user's email.
 * @returns {Promise<void>} - No return value.
 */
const forgetPasswordService = async (body: IForgetPasswordBody): Promise<void> => {
    try {
        const { email, client_base_url } = body;

        const userAttributes = [
            'id',
            'social_id',
            'first_name',
            'last_name',
            'email',
            'mobile_number',
            'reset_password_token',
            'auth_type',
            'role',
            'status'
        ];

        const userDetails = await User.query()
            .select(...userAttributes)
            .where({ email, role: constants.role['Admin'] })
            .first();

        if (!userDetails) throw new CustomError(ResponseMessages.AUTH.INVALID_CREDENTIALS, StatusCodes.BAD_REQUEST);

        // const resetPasswordLink =  await firebaseService.generatePasswordResetLink(userDetails.email, `${client_base_url}/${constants.userResetForgetLink}?email=${email}`);

        // const emailData = {
        //     name: userDetails.fullname,
        //     reset_password_link: resetPasswordLink
        // };

        const resetPasswordToken = generateRandomString(25);

        const token = jwtUtil.signJwt({
            user_id: userDetails.id,
            email: userDetails.email,
            reset_password_token: resetPasswordToken
        });

        await userDetails.$query().patch({ reset_password_token: resetPasswordToken });

        const emailData = {
            name: userDetails.fullname,
            reset_password_link: `${client_base_url}/${constants.userResetForgetLink}/${token}`
        };

        // send forget password email
        sendMail(userDetails.email, SUBJECTS.FORGOT_PASSWORD, TEMPLATES.FORGOT_PASSWORD, emailData);

        return;
    } catch (error) {
        log.error('forgetPasswordService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Verifies the validity of a reset password link based on the provided token.
 * @returns {Promise<IVerifyResetPasswordLinkResponse>} - An object indicating whether the link is valid.
 */
const verifyResetPasswordLinkService = async (params: IVerifyResetPasswordLinkParams): Promise<IVerifyResetPasswordLinkResponse> => {
    try {
        const { token } = params;

        const decodedToken = jwtUtil.validateJwt(token);

        if (!decodedToken) throw new CustomError(ResponseMessages.COMMON.NOT_AUTHENTICATED, StatusCodes.BAD_REQUEST);

        const userAttributes = [
            'id',
            'social_id',
            'first_name',
            'last_name',
            'email',
            'mobile_number',
            'reset_password_token',
            'auth_type',
            'role',
            'status'
        ];

        const userDetails = await User.query()
            .select(...userAttributes)
            .where({ id: decodedToken.data.user_id, role: constants.role['Admin'] })
            .first();

        if (!userDetails) throw new CustomError(ResponseMessages.AUTH.INVALID_CREDENTIALS, StatusCodes.BAD_REQUEST);
        if (userDetails?.reset_password_token !== decodedToken.data.reset_password_token)
            throw new CustomError(ResponseMessages.PASSWORD.INVALID_RESET_PASSWORD_LINK, StatusCodes.BAD_REQUEST);

        return { is_valid_link: true };
    } catch (error) {
        log.error('verifyResetPasswordLinkService Catch: ', error);
        throw error;
    }
};

/**
 * @author Jitendra Singh
 * @description Resets the password for a user using a reset password link.
 * @returns {Promise<void>} - No return value.
 */
const resetPasswordService = async (params: IResetPasswordParams, body: IResetPasswordBody): Promise<void> => {
    try {
        const { token } = params;
        const { password } = body;

        const decodedToken = jwtUtil.validateJwt(token);

        if (!decodedToken) throw new CustomError(ResponseMessages.COMMON.NOT_AUTHENTICATED, StatusCodes.BAD_REQUEST);

        const userAttributes = [
            'id',
            'social_id',
            'first_name',
            'last_name',
            'email',
            'mobile_number',
            'reset_password_token',
            'auth_type',
            'role',
            'status'
        ];

        const userDetails = await User.query()
            .select(...userAttributes)
            .where({ id: decodedToken.data.user_id, role: constants.role['Admin'] })
            .first();

        if (!userDetails) throw new CustomError(ResponseMessages.AUTH.INVALID_CREDENTIALS, StatusCodes.BAD_REQUEST);
        if (userDetails?.reset_password_token !== decodedToken.data.reset_password_token)
            throw new CustomError(ResponseMessages.PASSWORD.INVALID_RESET_PASSWORD_LINK, StatusCodes.BAD_REQUEST);

        const hashedPassword = await hashPassword(password);
        const dataToUpdate = {
            password: hashedPassword,
            reset_password_token: null
        };

        await User.query().patch(dataToUpdate).where({ id: userDetails.id });

        await firebaseService.updateUserPassword(userDetails.social_id, password);

        return;
    } catch (error) {
        log.error('resetPasswordService Catch: ', error);
        throw error;
    }
};

export const authService = {
    socialSignInService,
    forgetPasswordService,
    verifyResetPasswordLinkService,
    resetPasswordService
};
