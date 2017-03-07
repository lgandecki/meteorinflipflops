import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

class ChannelMessagesForm extends React.Component {

    onSubmit(event) {
        event.preventDefault();
        this.props.submit({variables: {channelName: this.props.channelName, handle:"someone", message:this.refs.message.value}})
        this.refs.message.value = '';
    }

    render() {

        return <div className="ChannelMessageForm">
            <form onSubmit={(event) => this.onSubmit(event)}>
                <input type="text" ref="message"/>
                <input type="submit"/>
            </form>
        </div>
    }
}

const createMessage = gql`
    mutation addMessage($channelName: String!, $handle: String!, $message: String!) {
        addMessage(channelName: $channelName, handle: $handle, message:$message) {
            handle, message
        }
    }`;

export default graphql(createMessage, {
    props({ ownProps, mutate }) {
        return {
            submit(opts) {
                const {message, channelName, handle} = opts.variables;
                return mutate({
                    variables: { message, channelName, handle},
                    optimisticResponse: {
                        __typename: 'Mutation',
                        addMessage: {
                            __typename: 'Message',
                            message,
                            handle,
                        },
                    },
                    updateQueries: {
                        ChannelMessages: (prev, { mutationResult }) => {
                            const newMessage = mutationResult.data.addMessage ;
                            return update(prev, {
                                Channel: {
                                    messages: {
                                        $push: [newMessage]
                                    }
                                },
                            });
                        },
                    },
                });
            },
        };
    }
})(ChannelMessagesForm);