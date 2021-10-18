import { uuid } from 'uuidv4';

import Client from '../infra/typeorm/entities/Client';
import CreateClientService from './CreateClientService';
import ShowClientService from './ShowClientService';
import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import AppError from '@shared/errors/AppError';

let showClientService: ShowClientService;
let createClientService: CreateClientService;

let client: Client;

describe('ShowClient', () => {
  beforeAll(async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    showClientService = new ShowClientService(fakeClientsRepository);
    createClientService = new CreateClientService(fakeClientsRepository);

    client = await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: uuid()
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
