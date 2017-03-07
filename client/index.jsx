import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import routes from './components/Routes';

Meteor.startup(() => {
    render(
        <div>
            {routes}
        </div>,
        document.getElementById('root'),
    );
});