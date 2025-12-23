import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { feedbackController } from './feedback.controller';
import { feedbackValidation } from './helpers/feedback.validation';

const router: Router = Router();

router.post('/', validateRequest(feedbackValidation.postFeedbackSchema), feedbackController.postFeedback);

export const feedbackRoutes = router;
