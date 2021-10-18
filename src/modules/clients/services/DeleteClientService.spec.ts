import FakeCitiesRepository from "@modules/cities/repositories/fakes/FakeCitiesRepository";
import CreateCityService from "@modules/cities/services/CreateCityService";
import AppError from "@shared/errors/AppError";
import { uuid } from "uuidv4";
import FakeClientsRepository from "../repositories/fakes/FakeClientsRepository";
import CreateClientService from "./CreateClientService";
import DeleteClientService from "./DeleteClientService";
import ShowClientService from "./ShowClientService";

let createClientService: CreateClientService;
let deleteClientService: DeleteClientService;
let showClientService: ShowClientService;
let createCityService: CreateCityService;

describe('DeleteClient', () => {
  beforeAll(() => {
    const fakeClientRepository = new FakeClientsRepository();
    const fakeCitiesRepository = new FakeCitiesRepository();
    createClientService = new CreateClientService(fakeClientRepository, fakeCitiesRepository);
    deleteClientService = new DeleteClientService(fakeClientRepository);
    showClientService = new ShowClientService(fakeClientRepository);
    createCityService = new CreateCityService(fakeCitiesRepository);
  })

  it('should delete a client', async () => {
    const city = await createCityService.execute({
      name: 'Test Name',
      state_id: uuid()
    })

    const client = await createClientService.execute({
      name: 'Test Name',
      gender: 'male',
      birthDate: new Date(),
      city_id: city.id
    })

    await deleteClientService.execute(client.id);

    await expect(showClientService.execute(client.id)).rejects.toBeInstanceOf(AppError);
  })

  it('should not delete a invalid client', async () => {
    await expect(deleteClientService.execute('123')).rejects.toBeInstanceOf(AppError);
  })
})
