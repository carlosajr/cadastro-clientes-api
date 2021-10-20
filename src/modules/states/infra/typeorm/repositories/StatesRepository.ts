import { getRepository, Repository } from "typeorm";

import State from "../entities/State";
import IStatesRepository from "@modules/states/repositories/IStatesRepository";

class StatesRepository implements IStatesRepository {
  private ormRepository: Repository<State>;

  constructor() {
    this.ormRepository = getRepository(State);
  }

  public async list(): Promise<State[]> {
    return await this.ormRepository.find();
  }

  public async findById(id: string): Promise<State | undefined> {
    return await this.ormRepository.findOne({
      where: { id }
    })
  }

}

export default StatesRepository;
