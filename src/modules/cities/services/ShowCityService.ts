import { injectable, inject } from 'tsyringe'
import City from "@modules/cities/infra/typeorm/entities/City";
import ICitiesRepository from "@modules/cities/repositories/ICitiesRepository";
import AppError from '@shared/errors/AppError';

@injectable()
class ShowCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) { }

  public async execute(id: string): Promise<City> {
    const city = await this.citiesRepository.show(id);

    if (!city) {
      throw new AppError('City not found');
    }

    return city;
  }
}

export default ShowCityService;
