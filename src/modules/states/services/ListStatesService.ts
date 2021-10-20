import { inject, injectable } from "tsyringe";

import State from "@modules/states/infra/typeorm/entities/State";
import IStatesRepository from "@modules/states/repositories/IStatesRepository";

@injectable()
class ListStatesService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) { }

  public async execute(): Promise<State[]> {
    return await this.statesRepository.list();
  }
}

export default ListStatesService;
