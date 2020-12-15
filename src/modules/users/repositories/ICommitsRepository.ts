import Commits from '../infra/typeorm/entities/Commits';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  createCommit(data: ICreateUserDTO): Promise<Commits>;
  saveCommit(commits: Commits): Promise<Commits>;
  findByCommit(name: string): Promise<Commits | undefined>;
}
