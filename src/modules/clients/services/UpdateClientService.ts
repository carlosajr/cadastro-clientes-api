import { injectable, inject } from 'tsyringe'

import Client from "@modules/clients/infra/typeorm/entities/Client";
import IClientsRepository from "@modules/clients/repositories/IClientsRepository";
import AppError from '@shared/errors/AppError';
import ICreateClientDto from '../dtos/ICreateClientDto';

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) { }

  public async execute(id: string, client: ICreateClientDto): Promise<Client> {
    const clientBd = await this.clientsRepository.findById(id);

    if (!clientBd) {
      throw new AppError('Client not found');
    }

    clientBd.name = client.name;
    clientBd.gender = client.gender;
    clientBd.birthDate = client.birthDate;
    clientBd.city_id = client.city_id;

    const updatedClient = await this.clientsRepository.update(clientBd);

    return updatedClient;
  }
}

export default UpdateClientService;
