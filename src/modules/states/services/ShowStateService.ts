import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import State from "../infra/typeorm/entities/State";

import IStatesRepository from "../repositories/IStatesRepository";

@injectable()
class ShowStateService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) { }

  public async execute(id: string): Promise<State> {
    const state = await this.statesRepository.findById(id);

    if (!state) {
      throw new AppError('State not found');
    }

    return state;
  }
}

export default ShowStateService;
