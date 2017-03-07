import React from 'react';
import {render} from 'react-dom';
import ChannelMessage from './Message.jsx';


import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class ChannelMessages extends React.Component {
    render() {
        console.log("this.props.data", this.props.data);
        if (this.props.data.loading) {
            return <p>loading...</p>
        }
        else {
            return <div className="ChannelMessages">
                {this.props.data.Channel.messages.map((message, index) => {
                        return (
                            <ChannelMessage key={index} handle={message.handle} text={message.message}/>
                        )
                    }
                )}
            </div>
        }
    }
}


const query = gql`
    query ($name: String!){
        Channel(name:$name) {
            messages{
                handle, message
            }
        }
    }
`;

export default graphql(query, {
    options: ({channelName}) => ({variables: {name: channelName}}),
})(ChannelMessages)