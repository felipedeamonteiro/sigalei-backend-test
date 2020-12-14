import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import fetch from 'node-fetch';

import routes from './routes';

import '../typeorm';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', async (request, response) => {
  const query1 = `
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

  const results2 = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({ query: query1 }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
    },
  }).then(res => res.text());
  // .then(body => console.log('body', body))
  // .catch(err => console.error(err));

  console.log('results', JSON.parse(results2).data.repository.object.history);

  return response.json({ message: 'Hello World Porra!' });
});

app.listen(3333, () => {
  console.log('👨‍⚖️️ Server started on port 3333');
});
