import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();

clientsRouter.use(ensureAuthenticated);

clientsRouter.get('/', ClientsController.list);
clientsRouter.get('/:id', ClientsController.show);

clientsRouter.post('/', ClientsController.create);

clientsRouter.put('/:id', ClientsController.update);

clientsRouter.delete('/:id', ClientsController.delete);

export default clientsRouter;
