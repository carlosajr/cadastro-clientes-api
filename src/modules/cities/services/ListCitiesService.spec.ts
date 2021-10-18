import { uuid } from 'uuidv4';

import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import CreateCityService from './CreateCityService';
import ListCitiesService from './ListCitiesService';

let listCitiesService: ListCitiesService;
let createCityService: CreateCityService;
let id: string;

describe('ListCity', () => {
  beforeAll(async () => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    listCitiesService = new ListCitiesService(fakeCitiesRepository);
    createCityService = new CreateCityService(fakeCitiesRepository);

    id = uuid();

    await createCityService.execute({
      name: 'Test Name',
      state_id: id
    });

    await createCityService.execute({
      name: 'Test Name Two',
      state_id: id
    });

    await createCityService.execute({
      name: 'Test Name Three',
      state_id: '12345'
    });

    await createCityService.execute({
      name: 'Different Name',
      state_id: '12345'
    });
  })

  it('should list all cities', async () => {
    const cities = await listCitiesService.execute({})

    expect(cities).toBeInstanceOf(Array);
  })

  it('should list all cities on the state', async () => {
    const cities = await listCitiesService.execute({ state_id: id })

    expect(cities).toBeInstanceOf(Array);
    expect(cities).toHaveLength(2);
  })

  it('should list all cities on the name like pattern', async () => {
    const cities = await listCitiesService.execute({ name: 'Test' })

    expect(cities).toBeInstanceOf(Array);
    expect(cities).toHaveLength(3);
  })

  it('should list all cities on the name like pattern on the state', async () => {
    const cities = await listCitiesService.execute({ state_id: id, name: 'Test' })

    expect(cities).toBeInstanceOf(Array);
    expect(cities).toHaveLength(2);
  })
})
