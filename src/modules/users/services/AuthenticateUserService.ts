import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe'

import User from "@modules/users/infra/typeorm/entities/User";
import authConfig from '@config/auth';
import AppError from "@shared/errors/AppError";
import IUserRepository from "../repositories/IUserRepository";

interface IRequest {
  username: string,
  password: string
}

interface Response {
  user: User,
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) { }

  public async execute({ username, password }: IRequest): Promise<Response> {

    const user = await this.usersRepository.findByUsername(username);

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
