import { injectable, inject } from 'tsyringe'
import City from "@modules/cities/infra/typeorm/entities/City";
import AppError from '@shared/errors/AppError';
import ICitiesRepository from "@modules/cities/repositories/ICitiesRepository";

interface IRequest {
  name: string,
  state_id: string
}

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) { }

  public async execute({ name, state_id }: IRequest): Promise<City> {
    const cityAlreadyRegistered = await this.citiesRepository.findByNameAndState({ name, state_id });

    if (cityAlreadyRegistered) {
      throw new AppError('City already registered in this State')
    }

    const city = await this.citiesRepository.create({ name, state_id });

    return city
  }
}

export default CreateCityService;
