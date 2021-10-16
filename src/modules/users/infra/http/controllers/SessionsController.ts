import { Request, Response } from "express";
import { container } from 'tsyringe';

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const authUser = await authenticateUserService.execute({ username, password });

    return response.json(authUser);
  }
}

export default new SessionsController();
