import City from "@modules/cities/infra/typeorm/entities/City";
import ICreateCityDto from "@modules/cities/dtos/ICreateCityDto";

export default interface ICitiesRepository {
  create(data: ICreateCityDto): Promise<City>
  findByNameAndState(data: ICreateCityDto): Promise<City | undefined>
}
