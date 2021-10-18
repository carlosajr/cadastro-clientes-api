
import { container } from 'tsyringe';

import '@modules/users/infra/providers/container';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import CitiesRepository from '@modules/cities/infra/typeorm/repositories/CitiesRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

container.registerSingleton<ICitiesRepository>('CitiesRepository', CitiesRepository);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IClientsRepository>('ClientsRepository', ClientsRepository);
