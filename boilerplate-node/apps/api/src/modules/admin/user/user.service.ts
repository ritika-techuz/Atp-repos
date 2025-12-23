import { log } from '@repo/logger';
import { QueryBuilder, User } from '@repo/db';
import { constants, storageConfig } from '@repo/config';
import { CustomError, ResponseMessages, StatusCodes } from '@repo/response-handler';
import { createPagination, PaginationResponse } from '@repo/utils';
import { deleteFile, s3Client, uploadFile, getPresignedUrl } from '@repo/storage-service';
import { firebaseService } from '@repo/firebase-auth';
import { generateValidPassword } from '@repo/utils';
import { sendMail, SUBJECTS, TEMPLATES } from '@repo/mailer';
import { IUserCreateBody, IUserListingFilter, IUserUpdateBody } from './helpers/user.types';

const user_Attributes = ['id', 'full_name', 'email', 'avtar', 'phone_number', 'status', 'role'];

/**
 * @author Yagnesh Acharya
 * @description Create User by email and auto-generated password
 */
const createUserService = async (body: IUserCreateBody): Promise<void> => {
    const trx = await User.startTransaction();
    try {
        const user = await firebaseService.isUserExists(body.email);
        if (user) throw new CustomError(ResponseMessages.USER.ALREADY_EXISTS, StatusCodes.CONFLICT);

        const generatedPassword = generateValidPassword();
        const createUser = await firebaseService.createFirebaseUser(body.email, generatedPassword);

        const userData = {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: generatedPassword,
            social_id: createUser.uid,
            auth_type: constants.authType.EMAIL,
            role: body.role ?? constants.role.User,
            status: body.status ?? constants.status.Active
        };

        // await User.query(trx).insert(userData);
        sendMail(userData.email, SUBJECTS.CREATE_USER, TEMPLATES.CREATE_USER, { ...userData, url: constants.loginPageURL });

        await trx.commit();
        return;
    } catch (error) {
        await trx.rollback();
        log.error('createUserService Catch: ', error);
        throw error;
    }
};

/**
 * @author Yagnesh Acharya
 * @description Fetch User by id
 */
const getUserByIdService = async (id: number): Promise<User> => {
    try {
        const user = await User.query().select(user_Attributes).findById(id).where('role', constants.role.User);
        if (!user) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        // if (user.profile_url) user.profile_url = await getPresignedUrl(storageConfig.s3BucketName, user.profile_url);
        return user;
    } catch (error) {
        log.error('getUserByIdService Catch: ', error);
        throw error;
    }
};

/**
 * @author Yagnesh Acharya
 * @description Fetch All Users
 */
const getAllUserService = async (query: IUserListingFilter): Promise<PaginationResponse> => {
    try {
        const { status, search, perPage, page, orderBy, orderDir } = query;
        const startRange = (page - 1) * perPage;
        const endRange = page * perPage - 1;

        let queryBuilder = User.query()
            .select(...user_Attributes)
            .modify((qb: QueryBuilder<User>) => {
                if (status) {
                    qb.where('status', status);
                }
                if (search) {
                    qb.where(builder => {
                        builder
                            .where('full_name', 'like', `%${search}%`)
                            .orWhere('email', 'like', `%${search}%`);
                    });
                }
            });
        if (orderBy) {
            queryBuilder = queryBuilder.orderBy(orderBy, orderDir);
        }
        const users = await queryBuilder.range(startRange, endRange);

        // No need to fetch profile_url, just return results
        const rows = createPagination(users.total, page, perPage, users.results);
        return rows;
    } catch (error) {
        log.error('getAllUserService Catch: ', error);
        throw error;
    }
};

/**
 * @author Yagnesh Acharya
 * @description Update user
 */
const updateUserService = async (body: IUserUpdateBody, file: Express.Multer.File): Promise<void> => {
    try {
        const { id, ...userBody } = body;
        const userAttributes = ['id', 'first_name', 'last_name', 'profile_url'];
        const userData = await User.query()
            .select(...userAttributes)
            .findOne({ role: constants.role.User, id });

        if (!userData) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        // let profile_url = userData.profile_url;
        if (!userData) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);

        // if (file) {
        //     if (profile_url) await deleteFile(s3Client, storageConfig.s3BucketName, profile_url);
        //     profile_url = `USER-${id}/USER/${file.originalname}`;
        //     await uploadFile(s3Client, storageConfig.s3BucketName, profile_url, file.buffer);
        // }

        // await userData.$query().patch({ ...userBody, profile_url });

        return;
    } catch (error) {
        log.error('updateUserService Catch: ', error);
        throw error;
    }
};

/**
 * @author Yagnesh Acharya
 * @description Update user status based on id , if active than inactive and vice versa
 */
const updateUserStatusService = async (id: number): Promise<void> => {
    try {
        const userData = await User.query().findById(id).where('role', constants.role.User);
        if (!userData) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        // await userData
        //     .$query()
        //     .where('id', id)
        //     .patch({ status: +userData.status === constants.status.Active ? constants.status.Inactive : constants.status.Active });
        return;
    } catch (error) {
        log.error('updateUserStatusService Catch: ', error);
        throw error;
    }
};

/**
 * @author Yagnesh Acharya
 * @description Delete user based on id
 */
const deleteUserService = async (id: number): Promise<void> => {
    try {
        const user = await User.query().findById(id).where('role', constants.role.User);
        if (!user) throw new CustomError(ResponseMessages.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
        await user.$query().where('id', id).patch({ deleted_at: new Date() });
        return;
    } catch (error) {
        log.error('deleteUserService Catch: ', error);
        throw error;
    }
};

export const userService = {
    getAllUserService,
    deleteUserService,
    updateUserStatusService,
    updateUserService,
    getUserByIdService,
    createUserService
};
