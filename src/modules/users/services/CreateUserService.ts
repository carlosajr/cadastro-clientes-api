import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUserRepository from "@modules/users/repositories/IUserRepository";

interface IRequest {
  name: string,
  username: string,
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) { }

  public async execute({ name, username, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByUsername(username);

    if (userExists) {
      throw new AppError('Username already registered')
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({ name, username, password: hashedPassword });

    return user;
  }
}

export default CreateUserService;
