import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { planValidation } from './helpers/plan.validation';
import { planController } from './plan.controller';

const router: Router = Router();

router.get('/:plan_id', validateRequest(planValidation.getPlanSchema), planController.getPlan);
router.get('/', validateRequest(planValidation.listPlanSchema), planController.listPlans);

export const planRoutes = router;
