import { AuthRoutes } from '@/pages';
import { AdminRoutes, FAQRoutes, StaticPagesRoutes, UserRoutes } from '@/pages';
import { CourseRoutes } from '@/pages/Course';

export const PUBLIC_ROUTES = [
  ...AuthRoutes,
];

export const PRIVATE_ROUTES = [
  ...AdminRoutes,
  ...FAQRoutes,
  ...StaticPagesRoutes,
  ...UserRoutes,
  ...CourseRoutes,
];
