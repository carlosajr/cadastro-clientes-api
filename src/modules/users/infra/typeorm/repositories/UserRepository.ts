import { getRepository, Repository } from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";
import ICreateUserDto from "@modules/users/dtos/ICreateUserDto";
import IUserRepository from "@modules/users/repositories/IUserRepository";

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({
      where: { username }
    })
  }

  public async create(userData: ICreateUserDto): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user)

    return user;
  }
}

export default UserRepository
