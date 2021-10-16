import { EntityRepository, Repository } from "typeorm";

import City from '@modules/cities/infra/typeorm/entities/City';

@EntityRepository(City)
class CitiesRepository extends Repository<City> {

  public async findByNameAndState(name: string, state_id: string): Promise<City | null> {
    const city = await this.findOne({
      where: { name, state_id }
    })

    return city ?? null;
  }

}

export default CitiesRepository;
