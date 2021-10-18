import AppError from "@shared/errors/AppError";
import FakeClientsRepository from "../repositories/fakes/FakeClientsRepository";
import CreateClientService from "./CreateClientService";
import DeleteClientService from "./DeleteClientService";
import ShowClientService from "./ShowClientService";

let createClientService: CreateClientService;
let deleteClientService: DeleteClientService;
let showClientService: ShowClientService;

describe('DeleteClient', () => {
  beforeAll(() => {
    const fakeClientsRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeClientsRepository);
    deleteClientService = new DeleteClientService(fakeClientsRepository);
    showClientService = new ShowClientService(fakeClientsRepository);
  })

  it('should delete a client', async () => {
    const client = await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: '123456789'
    })

    await deleteClientService.execute(client.id);

    await expect(showClientService.execute(client.id)).rejects.toBeInstanceOf(AppError);
  })

  it('should not delete a invalid client', async () => {
    await expect(deleteClientService.execute('123')).rejects.toBeInstanceOf(AppError);
  })
})
