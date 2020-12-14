import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  createUser(data: ICreateUserDTO): Promise<User>;
  saveUser(user: User): Promise<User>;
  findByName(name: string): Promise<User | undefined>;
}
