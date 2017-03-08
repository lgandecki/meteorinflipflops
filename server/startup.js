import {createApolloServer} from 'meteor/apollo';

import schema from '/server/api/schema';
import  { pubsub }  from '/server/api/resolvers';

import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';

import ChannelRepository from './connectors/ChannelRepository';

import { SubscriptionManager } from 'graphql-subscriptions';



export const subscriptionManager = new SubscriptionManager({
    schema,
    pubsub,
    setupFunctions: {
        messageAdded: (options, args) => ({
            messageAdded: message => {
                console.log("setup ", options);
                // console.log("setup args", args);
                console.log("setup message", message);
            }
        })
    }
})


const WS_PORT = 8080;

createApolloServer({
    schema,
    context: {
        Channels: new ChannelRepository()
    }
});


const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
});
websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
    `Websocket Server is now running on http://localhost:${WS_PORT}`,
));

// eslint-disable-next-line
new SubscriptionServer(
    {
        subscriptionManager,

        onSubscribe: (msg, params) => {
            console.log("on subscribe", msg, params);
            return Object.assign({}, params, {
                context: {
                    Channels: new ChannelRepository(),
                },
            });
        },
    }, {
        server: websocketServer,
    }
);