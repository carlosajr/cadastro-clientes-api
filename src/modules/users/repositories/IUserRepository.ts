import ICreateUserDto from "@modules/users/dtos/ICreateUserDto";
import User from "@modules/users/infra/typeorm/entities/User";

export default interface IUserRepository {
  findByUsername(username: string): Promise<User | undefined>
  create(data: ICreateUserDto): Promise<User>
}
