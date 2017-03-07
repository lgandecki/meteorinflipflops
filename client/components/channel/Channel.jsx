import React from 'react';
import {render} from 'react-dom';
import ChannelMessages from './ChannelMessages.jsx';
import ChannelMessageForm from './ChannelMessageForm.jsx';

export default class Channel extends React.Component {
    render() {
        return (
            <div>
                <ChannelMessages channelName={this.props.params.channelName}/>
                <ChannelMessageForm/>
            </div>
            )
    }
}


