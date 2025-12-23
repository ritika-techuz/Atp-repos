import { Router } from 'express';
import { notificationController } from './notification.controller';

const router: Router = Router();

router.get('/', notificationController.getNotifications);

router.put('/mark-as-read', notificationController.markAsRead);

router.get('/count', notificationController.getUnreadCount);

export const notificationRoutes = router;
