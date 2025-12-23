import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { faqValidation } from './helpers/faq.validation';
import { faqController } from './faq.controller';

const validation = faqValidation;
const controller = faqController;

const router: Router = Router();

router.get('/', validateRequest(validation.QUERY), controller.list);

export const faqRoutes = router;
