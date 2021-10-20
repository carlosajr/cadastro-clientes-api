import { Router } from "express";

import citiesRouter from "@modules/cities/infra/http/routes/cities.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import clientsRouter from "@modules/clients/infra/http/routes/clients.routes";
import statesRouter from "@modules/states/infra/http/routes/states.routes";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cities', citiesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/clients', clientsRouter);
routes.use('/states', statesRouter);

export default routes;
