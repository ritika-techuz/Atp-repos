import { NextFunction, Request, Response } from 'express';
import { ResponseMessages, sendResponse, StatusCodes } from '@repo/response-handler';
import { bookmarkService } from './bookmark.service';

/**
 * @author Sanjay Balai
 * @description Add or update a bookmark
 */
const addUpdateBookmark = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, user, language } = req;
        const data = await bookmarkService.addUpdateBookmarkService({ ...body, user_id: user?.id });
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.BOOKMARK.ADD_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Sanjay Balai
 * @description List bookmarks for a user
 */
const listBookmarks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user, query, language } = req;
        const data = await bookmarkService.listBookmarksService({ ...query, user_id: user?.id });
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.BOOKMARK.LIST_SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

export const bookmarkController = {
    addUpdateBookmark,
    listBookmarks
};
