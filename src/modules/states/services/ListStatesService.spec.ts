import FakeStatesRepository from "../repositories/fakes/FakeStatesRepository";
import ListStatesService from "./ListStatesService"

let listStatesService: ListStatesService;

describe('ListState', () => {
  beforeAll(async () => {
    const repositoryStates = new FakeStatesRepository();
    listStatesService = new ListStatesService(repositoryStates);
  })

  it('should list all states', async () => {
    const states = await listStatesService.execute();

    expect(states).toBeInstanceOf(Array);
    expect(states).toHaveLength(1);
  })
})
