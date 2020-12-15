/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
import { injectable, inject } from 'tsyringe';

import fetch from 'node-fetch';
import { parseData } from '@shared/utils';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

/**
 * Interface representing the graphql query node
 */

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

    const parsedData: any = await parseData(usersData);

    return parsedData;

    // const checkUserExists = await this.usersRepository.findByName(name);

    // if (checkUserExists) {
    //   return undefined;
    // }

    // const user = await this.usersRepository.createUser({ name });

    // return user;
  }
}

export default GetUsersInLinuxRepoService;
