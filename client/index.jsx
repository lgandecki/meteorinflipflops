import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import routes from './components/Routes';
import Account from './components/accounts/account.jsx';

import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {meteorClientConfig, createMeteorNetworkInterface} from 'meteor/apollo';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';


const wsClient = new SubscriptionClient('ws://localhost:8080');

const networkInterface = createMeteorNetworkInterface();

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
);

const apolloClient = new ApolloClient(meteorClientConfig({networkInterface: networkInterfaceWithSubscriptions}));

const funct = function(funct) {
    return funct;
}

const store = createStore(
    combineReducers({
        apollo: apolloClient.reducer(),
    }),
    {}, // initial state
    compose(
        // If you are using the devToolsExtension, you can add it here also
        applyMiddleware(apolloClient.middleware()),
        (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || funct,
    )
);

Meteor.startup(() => {
    render(
        <ApolloProvider store={store} client={apolloClient}>
        <Account>
            {routes}
        </Account>
        </ApolloProvider>,
        document.getElementById('root'),
    );
});

