import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import CreateCityService from '@modules/cities/services/CreateCityService';
import FakeStatesRepository from '@modules/states/repositories/fakes/FakeStatesRepository';
import AppError from '@shared/errors/AppError';
import Client from '../infra/typeorm/entities/Client';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import UpdateClientService from './UpdateClientService';

let createClientService: CreateClientService;
let updateClientService: UpdateClientService;
let client: Client;
let createCityService: CreateCityService;
let id: string;

describe('UpdateClient', () => {
  beforeEach(async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeCitiesRepository = new FakeCitiesRepository();
    const fakeStatesRepository = new FakeStatesRepository();
    createClientService = new CreateClientService(fakeClientsRepository, fakeCitiesRepository);
    updateClientService = new UpdateClientService(fakeClientsRepository);
    createCityService = new CreateCityService(fakeCitiesRepository, fakeStatesRepository);

    const state_id = '85e62d55-cb33-49c6-92e4-509162b5fea5';

    const city = await createCityService.execute({
      name: 'Test Name',
      state_id
    })

    id = city.id;

    client = await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: id
    })
  })

  it('should update a client', async () => {
    const updatedClient = await updateClientService.execute(client.id, {
      name: 'Test Name Two',
      gender: 'male',
      birthDate: new Date(),
      city_id: '123456789'
    })

    expect(updatedClient).toBeInstanceOf(Client);
    expect(updatedClient.name).toEqual('Test Name Two');
  })

  it('should not update a invalid client', async () => {
    await expect(updateClientService.execute('wrong-id', {
      name: 'Test Name Three',
      gender: 'male',
      birthDate: new Date(),
      city_id: '123456789'
    })).rejects.toBeInstanceOf(AppError);
  })
})
