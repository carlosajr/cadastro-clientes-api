import State from "@modules/states/infra/typeorm/entities/State";
import IStatesRepository from "../IStatesRepository";

class FakeStatesRepository implements IStatesRepository {
  private states: Array<State> = [
    {
      id: "85e62d55-cb33-49c6-92e4-509162b5fea5",
      name: "Paraíba",
      abbreviation: "PB",
      created_at: new Date(),
      updated_at: new Date()
    }
  ]

  public async list(): Promise<State[]> {
    return this.states;
  }

  public async findById(id: string): Promise<State | undefined> {
    return this.states.find(state => state.id === id);
  }
}

export default FakeStatesRepository;
