import React from 'react';
import {render} from 'react-dom';

export default class Message extends React.Component {
    render() {
        return (
            <div key={this.props.message} className="Message">
                <div className="handle">{this.props.handle}</div>
                <div className="text">{this.props.text}</div>
            </div>
        );
    }
}