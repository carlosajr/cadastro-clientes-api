import City from "@modules/cities/infra/typeorm/entities/City";
import CitiesRepository from "@modules/cities/repositories/CitiesRepository";
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface Request {
  name: string,
  state_id: string
}

class CreateCityService {
  private citiesRepository: CitiesRepository;

  constructor() {
    this.citiesRepository = getCustomRepository(CitiesRepository);
  }

  public async execute({ name, state_id }: Request): Promise<City> {
    const cityAlreadyRegistered = await this.citiesRepository.findByNameAndState(name, state_id);

    if (cityAlreadyRegistered) {
      throw new AppError('City already registered in this State')
    }

    const city = this.citiesRepository.create({ name, state_id });

    await this.citiesRepository.save(city);

    return city
  }
}

export default CreateCityService;
