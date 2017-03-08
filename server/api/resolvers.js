import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();
console.log("in resolvers");
const resolvers = {
    Query: {
        Channels(root, args, context) {
            console.log("channels in resolvers");
            return context.Channels.getChannels();
        },
        Channel(root, args, context) {
            console.log("channel in resolver")
            return context.Channels.getChannel(args.name)
        }
    },
    Mutation: {
        addMessage(_, {channelName, message, handle}, context) {
            const newMessage = context.Channels.post(channelName, message, handle);
            pubsub.publish('messageAdded', {message: newMessage, channelName});
            return newMessage;
        },
        addChannel(_, {channelName}, context) {
            // Meteor._sleepForMs(5000);
            context.Channels.createChannel(channelName);
            return context.Channels.getChannel(channelName);
        }
    },
    // Subscription: {
    //     messageAdded(message) {
    //         console.log("message", message);
    //         return message;
    //     }
    // }
};

export default resolvers;