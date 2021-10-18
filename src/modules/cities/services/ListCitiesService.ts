import { injectable, inject } from 'tsyringe'
import City from "@modules/cities/infra/typeorm/entities/City";
import ICitiesRepository from "@modules/cities/repositories/ICitiesRepository";
import IFindCitiesDto from '../dtos/IFindCitiesDto';

@injectable()
class ListCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) { }

  public async execute(dataSerach: IFindCitiesDto): Promise<City[]> {
    return await this.citiesRepository.list(dataSerach);
  }
}

export default ListCitiesService;
