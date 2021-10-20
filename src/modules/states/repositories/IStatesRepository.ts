import State from "../infra/typeorm/entities/State";

export default interface IStatesRepository {
  list(): Promise<State[]>;
  findById(id: string): Promise<State | undefined>;
}

