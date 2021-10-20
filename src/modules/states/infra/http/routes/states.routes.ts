import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StatesController from '../controllers/StatesController';

const statesRouter = Router();

statesRouter.use(ensureAuthenticated);

statesRouter.get('/', StatesController.list);
statesRouter.get('/:id', StatesController.show);

export default statesRouter;
