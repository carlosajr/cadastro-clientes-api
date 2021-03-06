import { Request, Response } from "express";
import { container } from 'tsyringe';

import CreateUserService from "@modules/users/services/CreateUserService";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, username, password });

    return response.json(user)
  }
}

export default new UsersController();
