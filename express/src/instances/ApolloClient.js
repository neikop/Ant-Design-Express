import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {storageAgent} from 'agents/LocalStorage';
import gql from 'graphql-tag';

// const IPv4 = '172.16.60.13:4000';
const IPv4 = 'localhost:4000';

const httpLink = createHttpLink({
  uri: `http://${IPv4}`,
});

const authLink = setContext((_, {headers}) => {
  const token = storageAgent.getAuthToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: `ws://${IPv4}`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: storageAgent.getAuthToken(),
    },
  },
});

const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const creator = {
  make: gql,
};
