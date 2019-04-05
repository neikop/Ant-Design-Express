import {client, creator} from 'instances/ApolloClient';

const feed = () =>
  client.query({
    query: creator.make`
      {
        feed {
          links {
            id
            createdAt
            url
            description
          }
        }
      }
    `,
  });

export const linkService = {
  feed,
};
