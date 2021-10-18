import { injectable, inject } from 'tsyringe';

import Client from "@modules/clients/infra/typeorm/entities/Client";
import IClientsRepository from "@modules/clients/repositories/IClientsRepository";
import IFindClientsDto from '../dtos/IFindClientsDto';

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) { }

  public async execute(dataSerach: IFindClientsDto): Promise<Client[]> {
    return await this.clientsRepository.list(dataSerach);
  }
}

export default ListClientsService;
