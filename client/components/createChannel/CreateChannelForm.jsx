import React from 'react';

export default class CreateChannelForm extends React.Component {

    onSubmit(event) {
        event.preventDefault();
    }

    render() {

        return <div className="CreateChannelForm">
            <div className="content">
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <input type="text" ref="text" placeholder="Enter channel name"/>
                    <input type="submit"/>
                </form>
            </div>
        </div>
    }
}