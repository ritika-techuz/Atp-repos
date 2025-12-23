import { sendResponse, StatusCodes } from '@repo/response-handler';
import { Request, Response, Router } from 'express';
import { authRoutes } from './auth/auth.routes';
import { profileRoutes } from './profile/profile.routes';
import { referralRoutes } from './referral/referral.routes';
import { bookmarkRoutes } from './bookmark/bookmark.routes';
import { feedbackRoutes } from './feedback/feedback.routes';
import { promoCodeRoutes } from './promoCode/promoCode.routes';
import { subscriptionRoutes } from './subscription/subscription.routes';
import userAuthMiddleware from '../../middlewares/userAuth.middleware';

const router: Router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Profile routes
router.use('/profile', userAuthMiddleware, profileRoutes);

// Promo code routes
router.use('/promo-code', userAuthMiddleware, promoCodeRoutes);

// Subscription routes
router.use('/subscription', subscriptionRoutes);

// Feedback routes
router.use('/feedback', userAuthMiddleware, feedbackRoutes);
router.use('/referrals', userAuthMiddleware, referralRoutes);

// Bookmark routes
router.use('/bookmark', userAuthMiddleware, bookmarkRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export const userRoutes = router;
