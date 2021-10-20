import { uuid } from 'uuidv4';

import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import ListClientsService from './ListClientsService';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import CreateCityService from '@modules/cities/services/CreateCityService';
import FakeStatesRepository from '@modules/states/repositories/fakes/FakeStatesRepository';

let listClientsService: ListClientsService;
let createClientService: CreateClientService;
let createCityService: CreateCityService;
let id: string;

describe('ListClients', () => {
  beforeAll(async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeCitiesRepository = new FakeCitiesRepository();
    const fakeStatesRepository = new FakeStatesRepository();
    listClientsService = new ListClientsService(fakeClientsRepository);
    createClientService = new CreateClientService(fakeClientsRepository, fakeCitiesRepository);
    createCityService = new CreateCityService(fakeCitiesRepository, fakeStatesRepository);

    const state_id = '85e62d55-cb33-49c6-92e4-509162b5fea5';

    const city = await createCityService.execute({
      name: 'Test Name',
      state_id: state_id
    })

    id = city.id;

    await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: id,
    });

    await createClientService.execute({
      name: 'Test Name Two',
      gender: 'male',
      birthDate: new Date(),
      city_id: id,
    });

    await createClientService.execute({
      name: 'Test Name Three',
      gender: 'female',
      birthDate: new Date(),
      city_id: id,
    });

    await createClientService.execute({
      name: 'Different Name',
      gender: 'female',
      birthDate: new Date(),
      city_id: id,
    });
  })

  it('should list all clients', async () => {
    const clients = await listClientsService.execute({})

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(4);
  })

  it('should list all clients by the city', async () => {
    const clients = await listClientsService.execute({ city_id: id })

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(4);
  })

  it('should list all clients by the name like pattern', async () => {
    const clients = await listClientsService.execute({ name: 'Test' })

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(3);
  })

  it('should list all clients by the gender', async () => {
    const clients = await listClientsService.execute({ gender: 'female' })

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(2);
  })

  it('should list all clients by the name, gender and city', async () => {
    const clients = await listClientsService.execute({ name: 'Test', gender: 'male', city_id: id })

    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(2);
  })
})
