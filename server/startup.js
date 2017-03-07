import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { typeDefs } from '/server/api/schema';
import { resolvers } from '/server/api/resolvers';

import ChannelRepository from '/server/connectors/ChannelRepository';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

createApolloServer({
    schema,
    context: {
        Channels: new ChannelRepository()
    }
});
