import { Router } from 'express';
import { stateRoutes } from './state/state.routes';
import { countryRoutes } from './country/country.routes';
import { planRoutes } from './plan/plan.routes';
import { faqRoutes } from './faq/faq.routes';
import { staticPagesRoutes } from './staticPages/staticPages.routes';
import { notificationRoutes } from './Notification/notification.routes';

const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// Notification routes
router.use('/notification', notificationRoutes);

// Plan routes
router.use('/plan', planRoutes);

// FAQ routes
router.use('/faq', faqRoutes);

// Static pages routes
router.use('/static-pages', staticPagesRoutes);

export const commonRoutes = router;
