import { Request, Response } from "express";
import { container } from 'tsyringe';

import ListStatesService from "@modules/states/services/ListStatesService";
import ShowStateService from "@modules/states/services/ShowStateService";

class StatesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listStatesService = container.resolve(ListStatesService);

    const states = await listStatesService.execute();

    return response.json(states)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showStateService = container.resolve(ShowStateService);

    const { id } = request.params;;

    const state = await showStateService.execute(id);

    return response.json(state);
  }
}

export default new StatesController();
