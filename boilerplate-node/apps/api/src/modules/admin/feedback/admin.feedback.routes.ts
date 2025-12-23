import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { adminFeedbackController } from './admin.feedback.controller';
import { feedbackValidation } from './helpers/admin.feedback.validation';

const router: Router = Router();

router.get('/', validateRequest(feedbackValidation.getAllFeedbackSchema), adminFeedbackController.getAllFeedbacks);

export const adminFeedbackRoutes = router;
