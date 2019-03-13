import {client} from 'settings/ApolloClient';
import gql from 'graphql-tag';

const feed = () =>
  client.query({
    query: gql`
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

export default {
  feed,
};
