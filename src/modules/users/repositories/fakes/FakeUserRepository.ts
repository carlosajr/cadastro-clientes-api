import User from "@modules/users/infra/typeorm/entities/User";
import ICreateUserDto from "@modules/users/dtos/ICreateUserDto";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import { uuid } from "uuidv4";

class UserRepository implements IUserRepository {
  private users: Array<User> = []

  public async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  public async create(userData: ICreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }
}

export default UserRepository
