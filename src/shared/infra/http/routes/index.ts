import { Router } from "express";

import citiesRouter from "@modules/cities/infra/http/routes/cities.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cities', citiesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
