import React from 'react';
import {render} from 'react-dom';
import ChannelMessage from './Message.jsx';


import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';



const query = gql`
    query ChannelMessages($name: String!){
        Channel(name:$name) {
            messages{
                handle, message
            }
        }
    }
`;
//
// function isDuplicateComment(newMessage, existingMessages) {
//     return newMessage.id !== null && existingMessages.some(comment => newMessage.id === message.id);
// }

class ChannelMessages extends React.Component {
    constructor(props) {
        super(props);
        this.subscription = null;
    }
    componentWillReceiveProps(nextProps) {
        if (!this.subscription && !nextProps.loading) {
            this.subscription = this.props.data.subscribeToMore({
                document: query,
                variables: { name: this.props.channelName },
                updateQuery: (previousResult, { subscriptionData }) => {
                    console.log("update query");
                    const newMessage = subscriptionData.data.messageAdded;

                    // if (isDuplicateMessage(newMessage, previousResult.entry.comments)) {
                    //     return previousResult;
                    // }
                    return update(previousResult, {
                        Channel: {
                            messages: {
                                $push: [newMessage]
                            }
                        },
                    });
                }
            })
        }
    }
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


export default graphql(query, {
    options: ({channelName}) => ({variables: {name: channelName}}),
})(ChannelMessages)