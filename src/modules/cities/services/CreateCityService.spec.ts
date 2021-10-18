
import { uuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';
import City from '@modules/cities/infra/typeorm/entities/City';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import CreateCityService from './CreateCityService';

let createCityService: CreateCityService;

describe('CreateCity', () => {
  beforeEach(() => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    createCityService = new CreateCityService(fakeCitiesRepository);
  })

  it('should create a new city', async () => {
    const city = await createCityService.execute({
      name: 'Test Name',
      state_id: uuid()
    })

    expect(city).toBeInstanceOf(City)
  })

  it('should not create a two cities on the same state', async () => {
    const stateId = uuid();

    await createCityService.execute({
      name: 'Test Name',
      state_id: stateId
    })

    await expect(createCityService.execute({
      name: 'Test Name',
      state_id: stateId
    })).rejects.toBeInstanceOf(AppError);
  })
})
