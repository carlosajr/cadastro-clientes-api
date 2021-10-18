import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CitiesController from '../controllers/CitiesController';

const citiesRouter = Router();

citiesRouter.use(ensureAuthenticated);

citiesRouter.get('/', CitiesController.list);
citiesRouter.get('/:id', CitiesController.show);

citiesRouter.post('/', CitiesController.create);

export default citiesRouter;
