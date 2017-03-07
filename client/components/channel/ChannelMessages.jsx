import React from 'react';
import {render} from 'react-dom';
import ChannelMessage from './Message.jsx';
const messages = [{handle: 'jaapm', message: "hello world!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}, {handle: 'derick', message: "hello man!"}];

export default class ChannelMessages extends React.Component {
    render() {
        return <div className="ChannelMessages">
            {messages.map((message, index) => {
                    return (
                        <ChannelMessage  key={index} handle={message.handle} text={message.message}/>
                    )
                }
            )}
        </div>
    }
}
