import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { activityController } from './activity.controller';
import { activityValidation } from './helpers/activity.validation';

const router: Router = Router();

router.get('/', validateRequest(activityValidation.listActivitySchema), activityController.listActivityLogs);

export const activityRoutes = router;
