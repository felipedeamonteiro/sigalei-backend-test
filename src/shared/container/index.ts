import { container } from 'tsyringe';

import ICommitsRepository from '@modules/users/repositories/ICommitsRepository';
import CommitsRepository from '@modules/users/infra/typeorm/repositories/CommitsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICommitsRepository>(
  'CommitsRepository',
  CommitsRepository,
);
