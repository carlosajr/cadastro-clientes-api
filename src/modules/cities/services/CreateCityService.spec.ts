
import { uuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';
import City from '@modules/cities/infra/typeorm/entities/City';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import CreateCityService from './CreateCityService';
import FakeStatesRepository from '@modules/states/repositories/fakes/FakeStatesRepository';

let createCityService: CreateCityService;
const state_id = '85e62d55-cb33-49c6-92e4-509162b5fea5';

describe('CreateCity', () => {
  beforeEach(() => {
    const fakeCitiesRepository = new FakeCitiesRepository();
    const fakeStatesRepository = new FakeStatesRepository();
    createCityService = new CreateCityService(fakeCitiesRepository, fakeStatesRepository);
  })

  it('should create a new city', async () => {
    const city = await createCityService.execute({
      name: 'Test Name',
      state_id: state_id
    })

    expect(city).toBeInstanceOf(City)
  })

  it('should not create a two cities on the same state', async () => {
    await createCityService.execute({
      name: 'Test Name',
      state_id: state_id
    })

    await expect(createCityService.execute({
      name: 'Test Name',
      state_id: state_id
    })).rejects.toBeInstanceOf(AppError);
  })
})
