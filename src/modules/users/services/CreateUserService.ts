import { getRepository } from "typeorm";
import { hash } from 'bcryptjs'

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";


interface Request {
  name: string,
  username: string,
  password: string
}

class CreateUserService {
  public async execute({ name, username, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { username }
    })

    if (checkUserExists) {
      throw new AppError('Username already registered')
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({ name, username, password: hashedPassword })

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
