/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
import { injectable, inject } from 'tsyringe';

import fetch from 'node-fetch';
import Commits from '../infra/typeorm/entities/Commits';
import ICommitsRepository from '../repositories/ICommitsRepository';

interface ICommitsByUserData {
  commitsAmount: number;
  commitsStats: Commits;
}

interface ICommitData {
  oid: string;
  author: {
    user: {
      login: string;
    };
  };
  committedDate: Date;
  additions: number;
  deletions: number;
}

@injectable()
class GetCommitsByUserService {
  constructor(
    @inject('CommitsRepository')
    private commitsRepository: ICommitsRepository,
  ) {}

  public async execute(): Promise<ICommitsByUserData> {
    const graphQLQuery = `
      query {
        repository(name:"linux" owner:"torvalds"){
          name
          defaultBranchRef {
            id
          }
          object(expression: "master") {
            ... on Commit {
              history(first: 100, since: "2020-01-01T00:00:00Z" ) {
                totalCount
                nodes {
                  oid
                  author {
                    user {
                      login
                    }
                  }
                  committedDate
                  additions
                  deletions
                }
              }
            }
          }
        }
      }`;
    const results = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify({ query: graphQLQuery }),
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
      },
    }).then(res => res.text());
    const totalCommits = JSON.parse(results).data.repository.object.history
      .totalCount;

    const commitsData = JSON.parse(results).data.repository.object.history
      .nodes;

    commitsData.map(async (commit: ICommitData) => {
      await this.commitsRepository.createCommit({
        oid: commit.oid,
        user_login: commit.author.user.login,
        lines_added: commit.additions,
        lines_removed: commit.deletions,
        date: commit.committedDate,
      });
    });

    return { commitsAmount: totalCommits, commitsStats: commitsData };
  }
}

export default GetCommitsByUserService;
