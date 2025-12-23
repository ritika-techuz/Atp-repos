import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { promoCodeController } from './promoCode.controller';
import { promoCodeValidation } from './helpers/promoCode.validation';

const router: Router = Router();

router.get('/validate/:id', validateRequest(promoCodeValidation.validatePromoCodeSchema), promoCodeController.validatePromoCode);

export const promoCodeRoutes = router;
