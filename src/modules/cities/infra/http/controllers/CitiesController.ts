import CreateCityService from "@modules/cities/services/createCityService";
import { Request, Response } from "express";
import { container } from 'tsyringe';

class CitiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCityService = container.resolve(CreateCityService);

    const { name, state_id } = request.body;

    const city = await createCityService.execute({ name, state_id });

    return response.json(city);
  }
}

export default new CitiesController();
