import { Router } from "express";

import CreateUserService from "@modules/users/services/CreateUserService";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();

usersRouter.post('/', UsersController.create)

export default usersRouter;
