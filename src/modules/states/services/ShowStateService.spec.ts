import AppError from "@shared/errors/AppError";
import State from "../infra/typeorm/entities/State";
import FakeStatesRepository from "../repositories/fakes/FakeStatesRepository";
import ShowStateService from "./ShowStateService";

let showStateService: ShowStateService;

describe('ShowState', () => {
  beforeAll(async () => {
    const repositoryStates = new FakeStatesRepository();
    showStateService = new ShowStateService(repositoryStates);
  })

  it('should show the state by id', async () => {
    const id = '85e62d55-cb33-49c6-92e4-509162b5fea5';
    const state = await showStateService.execute(id);

    expect(state).toHaveProperty('id', id);
  })

  it('should  not show the state with invalid id', async () => {
    await expect(
      showStateService.execute('12345')
    ).rejects.toBeInstanceOf(AppError);
  })
})
