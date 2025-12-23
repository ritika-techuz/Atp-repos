import { validateRequest } from '@repo/validator';
import { Router } from 'express';
import { checkModuleAccess } from '../../../middlewares/rbacPermission.middleware';
import { faqController } from './faq.controller';
import { faqValidation } from './helpers/faq.validation';

const validation = faqValidation;
const controller = faqController;

const router: Router = Router();

router.get('/', checkModuleAccess('faq', ['get']), validateRequest(validation.ListSchema), controller.list);
router.post('/', checkModuleAccess('faq', ['create']), validateRequest(validation.CreateSchema), controller.create);
router.put('/', checkModuleAccess('faq', ['edit']), validateRequest(validation.UpdateSchema), controller.update);
router.delete('/:id', checkModuleAccess('faq', ['delete']), validateRequest(validation.DeleteSchema), controller.remove);

export const faqRoutes = router;
