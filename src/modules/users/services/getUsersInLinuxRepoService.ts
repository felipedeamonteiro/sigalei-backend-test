import { injectable, inject } from 'tsyringe';

import fetch from 'node-fetch';
// import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

// @injectable()
class GetUsersInLinuxRepoService {
  constructor() {} // private usersRepository: IUsersRepository, // @inject('UsersRepository')

  public async execute(): Promise<void> {
    const graphQLQuery = `
      query {
        repository(name:"linux" owner:"torvalds"){
          name
          defaultBranchRef {
            id
          }
          object(expression: "master") {
            ... on Commit {
              oid
              history(first: 100, since: "2020-01-01T00:00:00Z" ) {
                totalCount
                nodes {
                  oid
                  messageHeadline
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
    // .then(body => console.log('body', body))
    // .catch(err => console.error(err));

    console.log('results', JSON.parse(results).data.repository.object.history);

    // const checkUserExists = await this.usersRepository.findByName(name);

    // if (checkUserExists) {
    //   return undefined;
    // }

    // const user = await this.usersRepository.createUser({ name });

    // return user;
  }
}

export default GetUsersInLinuxRepoService;
