import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe'

import User from "@modules/users/infra/typeorm/entities/User";
import authConfig from '@config/auth';
import AppError from "@shared/errors/AppError";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

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
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ username, password }: IRequest): Promise<Response> {

    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Incorrect username or password', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect username or password', 401);
    }

    const token = this.generateToken(user);

    return { user, token }
  }

  private generateToken(user: User): string {
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    })

    const prefixedToken = `bearer ${token}`;

    return prefixedToken;
  }
}

export default AuthenticateUserService
