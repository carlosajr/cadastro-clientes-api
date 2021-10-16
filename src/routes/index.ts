import { Router } from "express";

import citiesRouter from "./cities.routes";
import sessionsRouter from "./sessions.routes";
import usersRouter from "./users.routes";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cities', citiesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
