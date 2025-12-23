import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { promoCodeController } from './promoCode.controller';
import { promoCodeValidation } from './helpers/promoCode.validation';

const router: Router = Router();

router.get('/:id', validateRequest(promoCodeValidation.getPromoCodeSchema), promoCodeController.getPromoCode);
router.get('/', validateRequest(promoCodeValidation.listPromoCodeSchema), promoCodeController.listPromoCode);
router.post('/', validateRequest(promoCodeValidation.createPromCodeSchema), promoCodeController.createPromoCode);
router.put('/:id', validateRequest(promoCodeValidation.updatePromoCodeSchema), promoCodeController.updatePromoCode);
router.patch('/status/:id', validateRequest(promoCodeValidation.updatePromoCodeStatusSchema), promoCodeController.updatePromoCodeStatus);
router.delete('/:id', validateRequest(promoCodeValidation.deletePromoCodeSchema), promoCodeController.deletePromoCode);

export const promoCodeRoutes = router;
