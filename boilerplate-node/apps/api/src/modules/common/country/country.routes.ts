import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { countryValidation } from './helpers/country.validation';
import { countryController } from './country.controller';

const router: Router = Router();

router.get('/:country_id', validateRequest(countryValidation.getCountrySchema), countryController.getCountry);
router.get('/', countryController.listCountries);

export const countryRoutes = router;
