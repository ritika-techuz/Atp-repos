import { Router } from 'express';
import { stateController } from './state.controller';

const router: Router = Router();

router.get('/', stateController.listStates);

export const stateRoutes = router;
