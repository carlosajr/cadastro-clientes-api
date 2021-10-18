
import { uuid } from 'uuidv4';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

let createClientService: CreateClientService;

describe('CreateClient', () => {
  beforeEach(() => {
    const fakeClientRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeClientRepository);
  })

  it('should create a new client', async () => {
    const client = await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: uuid()
    })

    expect(client).toBeInstanceOf(Client)
  })
})
