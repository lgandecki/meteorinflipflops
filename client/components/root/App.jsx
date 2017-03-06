import React from 'react';
import {render} from 'react-dom';
import ChannelList from '../channelList/ChannelList';
import Channel from '../channel/Channel';

export default class App extends React.Component {
    render() {
        return <div>
            <div className="left"><ChannelList/></div>
            <div className="right"><Channel/></div>
        </div>
    }
}


