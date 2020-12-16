/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
import { injectable, inject } from 'tsyringe';

import fetch from 'node-fetch';
import { parseData } from '@shared/utils';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class GetUsersInLinuxRepoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
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
                  author {
                    user {
                      login
                    }
                  }
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
    // .then(body => console.log('body', body))
    // .catch(err => console.error(err));

    const usersData: any[] = JSON.parse(results).data.repository.object.history
      .nodes;

    const users: any = await parseData(usersData);

    users.byCommits.map(async (userDataByCommits: any) => {
      await this.usersRepository.createUser({
        name: userDataByCommits[0],
        commits: userDataByCommits[1],
        lines_added: userDataByCommits[2],
        lines_removed: userDataByCommits[3],
      });
    });

    return users;
  }
}

export default GetUsersInLinuxRepoService;
