import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { name },
    });

    return user;
  }

  public async createUser(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async saveUser(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UserRepository;
