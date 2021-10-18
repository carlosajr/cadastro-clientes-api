import Client from "../entities/Client";
import { getRepository, Repository, SelectQueryBuilder } from "typeorm";

import ICreateClientDto from "@modules/clients/dtos/ICreateClientDto";
import IFindClientsDto from "@modules/clients/dtos/IFindClientsDto";
import IClientsRepository from "@modules/clients/repositories/IClientsRepository";

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create(data: ICreateClientDto): Promise<Client> {
    const client = this.ormRepository.create(data);

    await this.ormRepository.save(client);

    return client;
  }

  public async findById(id: string): Promise<Client | undefined> {
    return await this.ormRepository.findOne({
      relations: ['city', 'city.state'],
      where: { id }
    })
  }

  public async list(dataSerach: IFindClientsDto): Promise<Client[]> {
    let query = this.ormRepository
      .createQueryBuilder('clients')
      .innerJoinAndSelect('clients.city', 'city')
      .innerJoinAndSelect('city.state', 'state');

    query = this.applyWhereListCity(query, dataSerach);

    return await query.getMany();
  }

  public async delete(client: Client): Promise<void> {
    await this.ormRepository.remove(client);
  }

  public async update(client: Client): Promise<Client> {
    const updatedClient = await this.ormRepository.save(client);

    return updatedClient;
  }

  private applyWhereListCity(
    query: SelectQueryBuilder<Client>,
    dataSerach: IFindClientsDto
  ): SelectQueryBuilder<Client> {
    if (dataSerach.name) {
      query.andWhere("clients.name like :name", { name: `%${dataSerach.name}%` });
    }

    if (dataSerach.gender) {
      query.andWhere('clients.gender = :gender', { gender: dataSerach.gender });
    }

    if (dataSerach.city_id) {
      query.andWhere('city.id = :id', { id: dataSerach.city_id });
    }

    if (dataSerach.state_id) {
      query.andWhere('state.id = :id', { id: dataSerach.state_id });
    }

    return query;
  }
}

export default ClientsRepository;
