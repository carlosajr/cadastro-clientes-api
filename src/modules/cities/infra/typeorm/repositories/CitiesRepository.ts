import { getRepository, Repository, SelectQueryBuilder } from "typeorm";

import City from '@modules/cities/infra/typeorm/entities/City';
import ICitiesRepository from "@modules/cities/repositories/ICitiesRepository";
import ICreateCityDto from "@modules/cities/dtos/ICreateCityDto";
import IFindCitiesDto from "@modules/cities/dtos/IFindCitiesDto";

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

  public async list(dataSerach: IFindCitiesDto): Promise<City[]> {
    let query = this.ormRepository
      .createQueryBuilder('cities')
      .innerJoinAndSelect('cities.state', 'state');

    query = this.applyWhereListCity(query, dataSerach);

    return await query.getMany();
  }

  public async show(id: string): Promise<City | undefined> {
    return await this.ormRepository.findOne({
      relations: ["state"],
      where: { id }
    });
  }

  public async findByNameAndState({ name, state_id }: IFindCitiesDto): Promise<City | undefined> {
    return await this.ormRepository.findOne({
      where: { name, state_id }
    })
  }

  private applyWhereListCity(
    query: SelectQueryBuilder<City>,
    dataSerach: IFindCitiesDto
  ): SelectQueryBuilder<City> {
    if (dataSerach.name) {
      query.andWhere("cities.name like :name", { name: `%${dataSerach.name}%` });
    }

    if (dataSerach.state_id) {
      query.andWhere('state.id = :id', { id: dataSerach.state_id });
    }

    return query;
  }

}

export default CitiesRepository;
