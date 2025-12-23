import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { planValidation } from './helpers/plan.validation';
import { planController } from './plan.controller';

const router: Router = Router();

router.post('/', validateRequest(planValidation.createPlanSchema), planController.createPlan);
router.put('/:id', validateRequest(planValidation.updatePlanSchema), planController.updatePlan);
router.patch('/status/:id', validateRequest(planValidation.updatePlanStatusSchema), planController.updatePlanStatus);

export const planRoutes = router;
