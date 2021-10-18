import { injectable, inject } from 'tsyringe';

import Client from "@modules/clients/infra/typeorm/entities/Client";
import IClientsRepository from "@modules/clients/repositories/IClientsRepository";
import ICreateClientDto from '../dtos/ICreateClientDto';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) { }

  public async execute(data: ICreateClientDto): Promise<Client> {
    const city = await this.citiesRepository.show(data.city_id);

    if (!city) {
      throw new AppError('City not found');
    }

    return await this.clientsRepository.create(data);
  }
}

export default CreateClientService;
