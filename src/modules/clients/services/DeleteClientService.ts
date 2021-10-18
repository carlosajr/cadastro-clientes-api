import { injectable, inject } from 'tsyringe'

import IClientsRepository from "@modules/clients/repositories/IClientsRepository";
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) { }

  public async execute(id: string): Promise<void> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found');
    }

    await this.clientsRepository.delete(client);
  }
}

export default DeleteClientService;
