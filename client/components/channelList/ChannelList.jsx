import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router'

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class ChannelList extends React.Component {
    render() {
        return <div className="ChannelList">
            <div className="left">
                <Link to="/createChannel" className="ChannelName">+</Link>
                {this.props.data.loading
                    ? <div>loading...</div>
                    : this.props.data.Channels.map((channel) => {
                        return (<Link key={channel.name} to={`/channel/${channel.name}`} activeClassName="active"
                                      className="ChannelName">{channel.name}</Link>);

                    })}
            </div>
            <div className="right">{this.props.children}</div>
        </div>
    }
}

const query = gql`
    query ChannelList {
        Channels {
            name
        }
    }
`;

export default graphql(query, {
    options: { pollInterval: 300000 },
})(ChannelList)

// {`/channel/${channel.name}`}