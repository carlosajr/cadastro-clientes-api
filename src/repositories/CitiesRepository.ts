import { EntityRepository, Repository } from "typeorm";

import City from "../models/City"

@EntityRepository(City)
class CitiesRepository extends Repository<City> {

  public async findByNameAndState(name: string, state: string): Promise<City | null> {
    const city = await this.findOne({
      where: { name, state }
    })

    return city ?? null;
  }

}

export default CitiesRepository;
