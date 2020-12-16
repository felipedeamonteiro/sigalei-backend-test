import Commits from '../infra/typeorm/entities/Commits';
import ICreateCommitsDTO from '../dtos/ICreateCommitsDTO';

export default interface ICommitsRepository {
  createCommit(data: ICreateCommitsDTO): Promise<Commits>;
  saveCommit(commits: Commits): Promise<Commits>;
  findByUserName(name: string): Promise<Commits[] | undefined>;
}
