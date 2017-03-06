import React from 'react';
import {render} from 'react-dom';

const channels = [{name: 'general'}, {name: 'foobar'}];

export default class ChannelList extends React.Component {
    render() {
        return <div>
            {channels.map((channel) => {
                return (<div key={channel.name}>{channel.name}</div>);
            })}
        </div>
    }
}


