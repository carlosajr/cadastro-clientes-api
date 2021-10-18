import AppError from '@shared/errors/AppError';
import Client from '../infra/typeorm/entities/Client';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import UpdateClientService from './UpdateClientService';

let createClientService: CreateClientService;
let updateClientService: UpdateClientService;
let client: Client;

describe('UpdateClient', () => {
  beforeEach(async () => {
    const fakeClientRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeClientRepository);
    updateClientService = new UpdateClientService(fakeClientRepository);

    client = await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: '123456789'
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
