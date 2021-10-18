import { Request, Response } from "express";
import { container } from 'tsyringe';

import CreateCityService from "@modules/cities/services/CreateCityService";
import ListCitiesService from "@modules/cities/services/ListCitiesService";
import ShowCityService from "@modules/cities/services/ShowCityService";
import IFindCitiesDto from "@modules/cities/dtos/IFindCitiesDto";

class CitiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCityService = container.resolve(CreateCityService);

    const { name, state_id } = request.body;

    const city = await createCityService.execute({ name, state_id });

    return response.status(201).json(city);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCityService = container.resolve(ListCitiesService);

    const dataSerach = request.body;

    const cities = await listCityService.execute(dataSerach);

    return response.json(cities);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showCityService = container.resolve(ShowCityService);

    const { id } = request.params;

    const city = await showCityService.execute(id);

    return response.json(city);
  }
}

export default new CitiesController();
