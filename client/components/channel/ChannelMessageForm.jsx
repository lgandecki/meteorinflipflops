import React from 'react';

export default class ChannelMessagesForm extends React.Component {

    onSubmit(event) {
        event.preventDefault();
    }

    render() {

        return <div className="ChannelMessageForm">
            <form onSubmit={(event) => this.onSubmit(event)}>
                <input type="text" ref="text"/>
                <input type="submit"/>
            </form>
        </div>
    }
}