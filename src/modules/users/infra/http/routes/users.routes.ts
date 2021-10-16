import { Router } from "express";
import { getRepository } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";
import CreateUserService from "@modules/users/services/CreateUserService";


const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return response.json(users);
})

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, username, password });

  return response.json(user)
})

export default usersRouter;
