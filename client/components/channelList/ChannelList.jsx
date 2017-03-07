import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router'

const channels = [{name: 'general'}, {name: 'foobar'}];

export default class ChannelList extends React.Component {
    render() {
        console.log("channel list", this.props.params.channelName);
        return <div className="ChannelList">
            <div className="left">
                {channels.map((channel) => {
                    return (<Link key={channel.name} to={`/channel/${channel.name}`} activeClassName="active" className="ChannelName">{channel.name}</Link>);

                })}
            </div>
            <div className="right">{this.props.children}</div>
        </div>
    }
}


// {`/channel/${channel.name}`}