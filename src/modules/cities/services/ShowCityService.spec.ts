import City from '../infra/typeorm/entities/City';
import CreateCityService from './CreateCityService';
import ShowCityService from './ShowCityService';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import AppError from '@shared/errors/AppError';
import FakeStatesRepository from '@modules/states/repositories/fakes/FakeStatesRepository';

let showCityService: ShowCityService;
let createCityService: CreateCityService;
const state_id = '85e62d55-cb33-49c6-92e4-509162b5fea5';

describe('ShowCity', () => {
  beforeEach(() => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    const fakeStatesRepository = new FakeStatesRepository();
    showCityService = new ShowCityService(fakeCitiesRepository);
    createCityService = new CreateCityService(fakeCitiesRepository, fakeStatesRepository);
  })

  it('should show a city', async () => {
    const city = await createCityService.execute({
      name: 'Test Name',
      state_id: state_id
    })

    const findCity = await showCityService.execute(city.id)

    expect(findCity).toBeInstanceOf(City);
  })

  it('should show the erro city not found', async () => {
    await expect(showCityService.execute('123')).rejects.toBeInstanceOf(AppError);
  })
})
