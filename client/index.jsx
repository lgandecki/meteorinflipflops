import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from './components/root/App.jsx'

Meteor.startup(() => {
    render(
        <App />,
        document.getElementById('root'),
    );
});