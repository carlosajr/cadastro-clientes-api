import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
  })

  it('should create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Test Name',
      username: 'testName',
      password: '123456'
    })

    expect(user).toBeInstanceOf(User)
  })

  it('should not create a two users with the same username', async () => {
    await createUserService.execute({
      name: 'Test Name',
      username: 'testName',
      password: '123456'
    })

    await expect(createUserService.execute({
      name: 'Test Name Two',
      username: 'testName',
      password: '12345678'
    })).rejects.toBeInstanceOf(AppError);
  })
})


