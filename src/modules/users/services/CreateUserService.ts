import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";

interface IRequest {
  name: string,
  username: string,
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ name, username, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByUsername(username);

    if (userExists) {
      throw new AppError('Username already registered')
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({ name, username, password: hashedPassword });

    return user;
  }
}

export default CreateUserService;
