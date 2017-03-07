import React, {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Root from './channelList/ChannelList.jsx';
import Channel from './channel/Channel.jsx';

export default <Router history={browserHistory}>
    <Route component={Root}>
        <Route path="/channel/:channelName" component={Channel} />
    </Route>
</Router>;