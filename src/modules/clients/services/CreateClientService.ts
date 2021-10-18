import { injectable, inject } from 'tsyringe';

import Client from "@modules/clients/infra/typeorm/entities/Client";
import IClientsRepository from "@modules/clients/repositories/IClientsRepository";
import ICreateClientDto from '../dtos/ICreateClientDto';

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) { }

  public async execute(data: ICreateClientDto): Promise<Client> {
    return await this.clientsRepository.create(data);
  }
}

export default CreateClientService;
