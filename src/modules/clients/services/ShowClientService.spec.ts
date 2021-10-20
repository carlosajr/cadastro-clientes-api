import Client from '../infra/typeorm/entities/Client';
import CreateClientService from './CreateClientService';
import ShowClientService from './ShowClientService';
import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import AppError from '@shared/errors/AppError';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import CreateCityService from '@modules/cities/services/CreateCityService';
import FakeStatesRepository from '@modules/states/repositories/fakes/FakeStatesRepository';

let showClientService: ShowClientService;
let createClientService: CreateClientService;
let createCityService: CreateCityService;
let id: string;

let client: Client;

describe('ShowClient', () => {
  beforeAll(async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeCitiesRepository = new FakeCitiesRepository();
    const fakeStatesRepository = new FakeStatesRepository();
    showClientService = new ShowClientService(fakeClientsRepository);
    createClientService = new CreateClientService(fakeClientsRepository, fakeCitiesRepository);
    createCityService = new CreateCityService(fakeCitiesRepository, fakeStatesRepository);

    const state_id = '85e62d55-cb33-49c6-92e4-509162b5fea5';

    const city = await createCityService.execute({
      name: 'Test Name',
      state_id: state_id
    })

    id = city.id;

    client = await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: id
    })
  })

  it('should show a client', async () => {
    const findClient = await showClientService.execute(client.id)

    expect(findClient).toBeInstanceOf(Client);
  })

  it('should show the erro: client not found', async () => {
    await expect(
      showClientService.execute('123')
    ).rejects.toBeInstanceOf(AppError);
  })
})
