import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import FakeStatesRepository from '@modules/states/repositories/fakes/FakeStatesRepository';
import CreateCityService from './CreateCityService';
import ListCitiesService from './ListCitiesService';

let listCitiesService: ListCitiesService;
let createCityService: CreateCityService;
const state_id = '85e62d55-cb33-49c6-92e4-509162b5fea5';

describe('ListCity', () => {
  beforeAll(async () => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    const fakeStatesRepository = new FakeStatesRepository();
    listCitiesService = new ListCitiesService(fakeCitiesRepository);
    createCityService = new CreateCityService(fakeCitiesRepository, fakeStatesRepository);

    await createCityService.execute({
      name: 'Test Name',
      state_id: state_id
    });

    await createCityService.execute({
      name: 'Test Name Two',
      state_id: state_id
    });

    await createCityService.execute({
      name: 'Test Name Three',
      state_id: state_id
    });

    await createCityService.execute({
      name: 'Different Name',
      state_id: state_id
    });
  })

  it('should list all cities', async () => {
    const cities = await listCitiesService.execute({})

    expect(cities).toBeInstanceOf(Array);
  })

  it('should list all cities on the state', async () => {
    const cities = await listCitiesService.execute({ state_id })

    expect(cities).toBeInstanceOf(Array);
    expect(cities).toHaveLength(4);
  })

  it('should list all cities on the name like pattern', async () => {
    const cities = await listCitiesService.execute({ name: 'Test' })

    expect(cities).toBeInstanceOf(Array);
    expect(cities).toHaveLength(3);
  })

  it('should list all cities on the name like pattern on the state', async () => {
    const cities = await listCitiesService.execute({ state_id: state_id, name: 'Test' })

    expect(cities).toBeInstanceOf(Array);
    expect(cities).toHaveLength(3);
  })
})
