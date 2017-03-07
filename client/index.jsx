import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import routes from './components/Routes';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';


const apolloClient = new ApolloClient();

const store = createStore(
    combineReducers({
        apollo: apolloClient.reducer(),
    }),
    {}, // initial state
    compose(
        applyMiddleware(apolloClient.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

Meteor.startup(() => {
    render(
        <ApolloProvider store={store} client={apolloClient}>
        <div>
            {routes}
        </div>
        </ApolloProvider>,
        document.getElementById('root'),
    );
});

