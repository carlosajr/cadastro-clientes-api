
import { uuid } from 'uuidv4';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import CreateCityService from '@modules/cities/services/CreateCityService';
import AppError from '@shared/errors/AppError';
import FakeStatesRepository from '@modules/states/repositories/fakes/FakeStatesRepository';

let createClientService: CreateClientService;
let createCityService: CreateCityService;
let id: string;

describe('CreateClient', () => {
  beforeEach(async () => {
    const fakeClientRepository = new FakeClientsRepository();
    const fakeCitiesRepository = new FakeCitiesRepository();
    const fakeStatesRepository = new FakeStatesRepository();
    createClientService = new CreateClientService(fakeClientRepository, fakeCitiesRepository);

    createCityService = new CreateCityService(fakeCitiesRepository, fakeStatesRepository);

    const state_id = '85e62d55-cb33-49c6-92e4-509162b5fea5';

    const city = await createCityService.execute({
      name: 'Test Name',
      state_id: state_id
    })

    id = city.id;
  })

  it('should create a new client', async () => {
    const client = await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: id
    })

    expect(client).toBeInstanceOf(Client)
  })

  it('should not create a new client with invalid city', async () => {
    await expect(createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: uuid()
    })).rejects.toBeInstanceOf(AppError)
  })
})
