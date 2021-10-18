import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
    authenticateUserService = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
  })

  it('should authenticate a valid user', async () => {
    const findByUsername = jest.spyOn(fakeUserRepository, 'findByUsername');
    const compareHash = jest.spyOn(fakeHashProvider, 'compareHash');

    await createUserService.execute({
      name: 'Test Name',
      username: 'testName',
      password: '123456'
    });

    const authUser = await authenticateUserService.execute({
      username: 'testName',
      password: '123456'
    });

    expect(findByUsername).toHaveBeenCalledWith('testName');
    expect(compareHash).toHaveBeenCalledWith('123456', '123456');

    expect(authUser).toHaveProperty('token');
  })

  it('should not authenticate a user with invalid username', async () => {
    const findByUsername = jest.spyOn(fakeUserRepository, 'findByUsername');

    await createUserService.execute({
      name: 'Test Name',
      username: 'testNameTwo',
      password: '123456'
    })

    expect(authenticateUserService.execute({
      username: 'test',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);

    expect(findByUsername).toHaveBeenCalledWith('test');
  })

  it('should not authenticate a user with invalid password', async () => {
    const findByUsername = jest.spyOn(fakeUserRepository, 'findByUsername');

    await createUserService.execute({
      name: 'Test Name',
      username: 'testNameThree',
      password: '123456'
    })

    await expect(authenticateUserService.execute({
      username: 'testNameThree',
      password: '12345678'
    })).rejects.toBeInstanceOf(AppError);

    expect(findByUsername).toHaveBeenCalledWith('testNameThree');
  })
})


