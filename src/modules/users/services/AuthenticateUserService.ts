import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from 'jsonwebtoken';

import User from "@modules/users/infra/typeorm/entities/User";
import authConfig from '@config/auth';
import AppError from "@shared/errors/AppError";

interface Request {
  username: string,
  password: string
}

interface Response {
  user: User,
  token: string
}

class AuthenticateUserService {
  public async execute({ username, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { username }
    });

    if (!user) {
      throw new AppError('Incorrect username or password', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect username or password', 401);
    }

    const token = this.generateToken(user);

    return { user, token }
  }

  private generateToken(user: User): string {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    })
  }
}

export default AuthenticateUserService
