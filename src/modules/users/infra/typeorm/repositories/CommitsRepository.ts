import { getRepository, Repository } from 'typeorm';

import ICommitsRepository from '@modules/users/repositories/ICommitsRepository';
import ICreateCommitsDTO from '@modules/users/dtos/ICreateCommitsDTO';

import Commits from '../entities/Commits';

class CommitsRepository implements ICommitsRepository {
  private ormRepository: Repository<Commits>;

  constructor() {
    this.ormRepository = getRepository(Commits);
  }

  public async findByUserName(name: string): Promise<Commits | undefined> {
    const user = await this.ormRepository.findOne({
      where: { name },
    });

    return user;
  }

  public async createCommit(commitData: ICreateCommitsDTO): Promise<Commits> {
    const commit = this.ormRepository.create(commitData);

    await this.ormRepository.save(commit);

    return commit;
  }

  public async saveCommit(commits: Commits): Promise<Commits> {
    return this.ormRepository.save(commits);
  }
}

export default CommitsRepository;
