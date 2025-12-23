import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { staticPagesValidation } from './helpers/staticPages.validation';
import { staticPagesController } from './staticPages.controller';

const validation = staticPagesValidation;
const controller = staticPagesController;

const router: Router = Router();

router.get('/:page', validateRequest(validation.PARAMS), controller.get);

export const staticPagesRoutes = router;
