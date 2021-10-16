import { Router } from "express";
import { container } from 'tsyringe';

import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();

sessionsRouter.post('/', SessionsController.create)

export default sessionsRouter;
