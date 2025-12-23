import { validateRequest } from '@repo/validator';
import { Router } from 'express';
import { bookmarkController } from './bookmark.controller';
import { bookmarkValidation } from './helpers/bookmark.validation';

const router: Router = Router();

router.post('/', validateRequest(bookmarkValidation.addUpdateBookmarkSchema), bookmarkController.addUpdateBookmark);
router.get('/', validateRequest(bookmarkValidation.listBookmarksSchema), bookmarkController.listBookmarks);

export const bookmarkRoutes = router;
