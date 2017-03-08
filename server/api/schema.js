import  resolvers  from '/server/api/resolvers';

import {makeExecutableSchema} from 'graphql-tools';

const gql = schema => schema;

export const typeDefs = gql`
    type Message {
        handle: String!,
        message: String!
    }
    type Channel {
        name: String!,
        messages: [Message]!
    }
    type Query {
        Channels: [Channel]!,
        Channel(name:String!): Channel
    }
    type Mutation {
        addMessage(channelName: String!, message: String!, handle: String!): Message!
        addChannel(channelName: String!): Channel!
    }
    type Subscription {
        messageAdded(channelName: String!): Message
    }
    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;