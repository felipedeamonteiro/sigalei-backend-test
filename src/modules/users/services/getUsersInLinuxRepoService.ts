import api from '@shared/services/api';

const results = api
  .post('', {
    data: {
      query: `
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
    `,
    },
  })
  .then(result => result.data);

console.log('results', results);
