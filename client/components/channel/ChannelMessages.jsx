import React from 'react';
import {render} from 'react-dom';
import ChannelMessage from './Message.jsx';


import {graphql, withApollo} from 'react-apollo';
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
        this.subscriptionObserver = null;
        this.subscriptionChannelName = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.subscriptionChannelName !== nextProps.channelName) {
            if (this.subscriptionObserver) {
                this.subscriptionObserver.unsubscribe();
            }
            this.subscribe(nextProps.channelName, nextProps.data.updateQuery);
        }
    }
    componentWillUnmount() {
        if (this.subscriptionObserver) {
            this.subscriptionObserver.unsubscribe();
        }
    }

    subscribe(channelName, updateMessagesQuery) {
        const MESSAGES_QUERY = gql`
            subscription onMessageAdded($channelName: String!) {
                messageAdded(channelName: $channelName) {
                    handle
                    message
                }
            }
        `;

        this.subscriptionChannelName = channelName;
        this.subscriptionObserver = this.props.client.subscribe({
            query: MESSAGES_QUERY,
            variables: { channelName },
        }).subscribe({
            next(data) {
                const newMessage = data.messageAdded;

                updateMessagesQuery((previousResult) => {
                    // if (isAllReadyPresent(newMessage, previousResult.channel.messages)) {
                    //     return previousResult;
                    // }

                    return update(previousResult, {
                        Channel: {
                            messages: {
                                $push: [newMessage],
                            },
                        },
                    });
                });
            },
            error(err) {
                console.error('Error', err);
            }
        });
    }


    // componentWillReceiveProps(nextProps) {
    //     if (!this.subscription && !nextProps.loading) {
    //         this.subscription = this.props.data.subscribeToMore({
    //             document: query,
    //             variables: { name: this.props.channelName },
    //             updateQuery: (previousResult, { subscriptionData }) => {
    //                 console.log("update query");
    //                 const newMessage = subscriptionData.data.messageAdded;
    //
    //                 // if (isDuplicateMessage(newMessage, previousResult.entry.comments)) {
    //                 //     return previousResult;
    //                 // }
    //                 return update(previousResult, {
    //                     Channel: {
    //                         messages: {
    //                             $push: [newMessage]
    //                         }
    //                     },
    //                 });
    //             }
    //         })
    //     }
    // }
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


export default withApollo(graphql(query, {
    options: ({channelName}) => ({variables: {name: channelName}}),
})(ChannelMessages))