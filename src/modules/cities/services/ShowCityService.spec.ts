import { uuid } from 'uuidv4';

import City from '../infra/typeorm/entities/City';
import CreateCityService from './CreateCityService';
import ShowCityService from './ShowCityService';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import AppError from '@shared/errors/AppError';

let showCityService: ShowCityService;
let createCityService: CreateCityService;

describe('ShowCity', () => {
  beforeEach(() => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    showCityService = new ShowCityService(fakeCitiesRepository);
    createCityService = new CreateCityService(fakeCitiesRepository);
  })

  it('should show a city', async () => {
    const city = await createCityService.execute({
      name: 'Test Name',
      state_id: uuid()
    })

    const findCity = await showCityService.execute(city.id)

    expect(findCity).toBeInstanceOf(City);
  })

  it('should show the erro city not found', async () => {
    await expect(showCityService.execute('123')).rejects.toBeInstanceOf(AppError);
  })
})
