import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import routes from './components/Routes';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const apolloClient = new ApolloClient();


Meteor.startup(() => {
    render(
        <ApolloProvider client={apolloClient}>
        <div>
            {routes}
        </div>
        </ApolloProvider>,
        document.getElementById('root'),
    );
});

