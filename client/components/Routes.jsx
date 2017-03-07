import React, {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Root from './channelList/ChannelList.jsx';
import Channel from './channel/Channel.jsx';
import CreateChannelForm from './createChannel/CreateChannelForm.jsx';

export default <Router history={browserHistory}>
    <Route component={Root}>
        <Route path="/channel/:channelName" component={Channel} />
        <Route path="/createChannel" component={CreateChannelForm} />
    </Route>
</Router>;