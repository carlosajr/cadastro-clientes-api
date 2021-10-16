import { getRepository, Repository } from "typeorm";

import City from '@modules/cities/infra/typeorm/entities/City';
import ICitiesRepository from "@modules/cities/repositories/ICitiesRepository";
import ICreateCityDto from "@modules/cities/dtos/ICreateCityDto";

class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public async create({ name, state_id }: ICreateCityDto): Promise<City> {
    const city = this.ormRepository.create({ name, state_id });

    await this.ormRepository.save(city)

    return city;
  }

  public async findByNameAndState({ name, state_id }: ICreateCityDto): Promise<City | undefined> {
    return await this.ormRepository.findOne({
      where: { name, state_id }
    })
  }

}

export default CitiesRepository;
