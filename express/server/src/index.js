const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Campaign = require('./resolvers/Campaign');
const Script = require('./resolvers/Script');
const Question = require('./resolvers/Question');
const Answer = require('./resolvers/Answer');
const Decision = require('./resolvers/Decision');

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Campaign,
  Script,
  Question,
  Answer,
  Decision,
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
