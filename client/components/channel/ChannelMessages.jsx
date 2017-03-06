import React from 'react';
import {render} from 'react-dom';

const messages = [{handle: 'jaapm', message: "hello world!"}, {handle: 'derick', message: "hello man!"}];

export default class ChannelMessages extends React.Component {
    render() {
        return <div>
            {messages.map((message) => {
                return (
                    <div key={message.message}>
                        <div className="handle">{message.handle}</div>
                        <div className="text">{message.message}</div>
                    </div>);
            })}
        </div>
    }
}
