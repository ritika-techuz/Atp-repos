import { Router } from 'express';
import multer from 'multer';
import { validateRequest } from '@repo/validator';
import { profileController } from './profile.controller';
import { profileValidation } from './helpers/profile.validation';

const router: Router = Router();

router.get('/', profileController.getProfile);
router.patch('/', multer().single('profile_image'), validateRequest(profileValidation.updateProfileSchema), profileController.updateProfile);
router.patch('/password', validateRequest(profileValidation.changePasswordSchema), profileController.changePassword);
router.post('/logout', validateRequest(profileValidation.logoutSchema), profileController.logout);

export const profileRoutes = router;
