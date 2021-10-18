import { uuid } from "uuidv4";
import ICreateClientDto from "@modules/clients/dtos/ICreateClientDto";
import Client from "@modules/clients/infra/typeorm/entities/Client";
import IClientsRepository from "../IClientsRepository";
import IFindClientsDto from "@modules/clients/dtos/IFindClientsDto";

class FakeClientsRepository implements IClientsRepository {
  private clients: Array<Client> = []

  public async create({ name, gender, birthDate, city_id }: ICreateClientDto): Promise<Client> {
    const client = new Client();

    Object.assign(client, { id: uuid(), name, gender, birthDate, city_id })

    this.clients.push(client);

    return client;
  }

  public async findById(id: string): Promise<Client | undefined> {
    return this.clients.find(client => client.id === id);
  }

  public async list({ name, gender, city_id }: IFindClientsDto): Promise<Client[]> {
    return this.clients.filter(client => {
      if (name && city_id && gender) {
        return client.name.match(name) && client.city_id === city_id && client.gender === gender;
      }

      if (name) {
        return client.name.match(name);
      }

      if (city_id) {
        return client.city_id === city_id;
      }

      if (gender) {
        return client.gender === gender;
      }

      return true;
    })
  }

  public async delete(client: Client): Promise<void> {
    const index = this.clients.findIndex(c => c.id === client.id)

    this.clients.splice(index, 1);
  }

  public async update(client: Client): Promise<Client> {
    const index = this.clients.findIndex(c => c.id === client.id);

    this.clients[index] = client;

    return this.clients[index];
  }
}

export default FakeClientsRepository;
