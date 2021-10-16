import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CitiesController from '../controllers/CitiesController';

const citiesRouter = Router();

citiesRouter.use(ensureAuthenticated)

// citiesRouter.get('/', async (request, response) => {
//   const cities = await citiesRepository.find();

//   return response.json(cities);
// })

citiesRouter.post('/', CitiesController.create)

export default citiesRouter;
