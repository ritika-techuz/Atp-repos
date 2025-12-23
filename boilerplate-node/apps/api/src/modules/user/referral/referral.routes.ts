import { validateRequest } from '@repo/validator';
import { Router } from 'express';
import { referralValidation } from './helpers/referral.validation';
import { referralController } from './referral.controller';

const router: Router = Router();

router.get('/', validateRequest(referralValidation.getReferralHistorySchema), referralController.getReferralHistory);

export const referralRoutes = router;
