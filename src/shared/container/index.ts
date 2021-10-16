
import { container } from 'tsyringe'

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import CitiesRepository from '@modules/cities/infra/typeorm/repositories/CitiesRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<ICitiesRepository>('CitiesRepository', CitiesRepository);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
