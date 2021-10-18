import City from "@modules/cities/infra/typeorm/entities/City";
import ICreateCityDto from "@modules/cities/dtos/ICreateCityDto";
import IFindCitiesDto from "../dtos/IFindCitiesDto";

export default interface ICitiesRepository {
  create(data: ICreateCityDto): Promise<City>;
  show(id: string): Promise<City | undefined>;
  list(dataSerach: IFindCitiesDto): Promise<City[]>;
  findByNameAndState(dataSerach: IFindCitiesDto): Promise<City | undefined>;
}
