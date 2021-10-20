import { injectable, inject } from 'tsyringe'
import City from "@modules/cities/infra/typeorm/entities/City";
import AppError from '@shared/errors/AppError';
import ICitiesRepository from "@modules/cities/repositories/ICitiesRepository";
import IStatesRepository from '@modules/states/repositories/IStatesRepository';

interface IRequest {
  name: string,
  state_id: string
}

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) { }

  public async execute(data: IRequest): Promise<City> {
    await this.validate(data);

    const city = await this.citiesRepository.create(data);

    return city
  }

  private async validate({ name, state_id }: IRequest): Promise<void> {
    const stateExist = await this.statesRepository.findById(state_id);

    if (!stateExist) {
      throw new AppError('State not found');
    }

    const cityAlreadyRegistered = await this.citiesRepository.findByNameAndState({ name, state_id });

    if (cityAlreadyRegistered) {
      throw new AppError('City already registered in this State');
    }
  }
}

export default CreateCityService;
