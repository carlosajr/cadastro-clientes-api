import { uuid } from 'uuidv4';

import City from '@modules/cities/infra/typeorm/entities/City';
import ICitiesRepository from "@modules/cities/repositories/ICitiesRepository";
import ICreateCityDto from "@modules/cities/dtos/ICreateCityDto";
import AppError from '@shared/errors/AppError';
import IFindCitiesDto from '@modules/cities/dtos/IFindCitiesDto';

class FakeCitiesRepository implements ICitiesRepository {
  private cities: Array<City> = []

  public async create({ name, state_id }: ICreateCityDto): Promise<City> {
    const city = new City();

    Object.assign(city, { id: uuid(), name, state_id })

    this.cities.push(city)

    return city;
  }

  public async list({ name, state_id }: IFindCitiesDto): Promise<City[]> {
    return this.cities.filter(city => {
      if (name && state_id) {
        return city.name.match(name) && city.state_id === state_id;
      }

      if (name) {
        return city.name.match(name);
      }

      if (state_id) {
        return city.state_id === state_id;
      }

      return true;
    });
  }

  public async show(id: string): Promise<City | undefined> {
    return this.cities.find(city => city.id === id);
  }

  public async findByNameAndState({ name, state_id }: ICreateCityDto): Promise<City | undefined> {
    return this.cities.find(city => city.name === name && city.state_id === state_id)
  }

}

export default FakeCitiesRepository;
