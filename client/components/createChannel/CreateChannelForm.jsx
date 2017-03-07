import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

class CreateChannelForm extends React.Component {

    onSubmit(event) {
        event.preventDefault();
        this.props.submit({variables: {name: this.refs.text.value}})

        this.refs.text.value = '';
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

const createChannel = gql`
    mutation addChannel($name: String!) {
        addChannel(channelName: $name) {
            name
        }
    }`;

export default graphql(createChannel, {
    props({ ownProps, mutate }) {
        return {
            submit(opts) {
                const newChannelName = opts.variables.name;
                return mutate({
                    variables: { name: newChannelName },
                    optimisticResponse: {
                        __typename: 'Mutation',
                        addChannel: {
                            __typename: 'Channel',
                            name: newChannelName,
                        },
                    },
                    updateQueries: {
                        ChannelList: (prev, { mutationResult }) => {
                            const newChannel = mutationResult.data.addChannel;
                            return update(prev, {
                                    Channels: {
                                        $push: [newChannel],
                                    },
                            });
                        },
                    },
                });
            },
        };
    }
})(CreateChannelForm);