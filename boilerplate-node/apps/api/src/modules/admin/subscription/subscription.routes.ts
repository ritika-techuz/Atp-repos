import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { subscriptionController } from './subscription.controller';
import { subscriptionValidation } from './helpers/subscription.validation';

const router: Router = Router();

router.get('/transactions', validateRequest(subscriptionValidation.listTransactionSchema), subscriptionController.listTransaction);

export const subscriptionRoutes = router;
