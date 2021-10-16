import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const authenticateUserService = new AuthenticateUserService()

  const authUser = await authenticateUserService.execute({ username, password });

  return response.json(authUser);
})

export default sessionsRouter;
