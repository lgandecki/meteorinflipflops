import { PubSub } from 'graphql-subscriptions';
import { Channels } from '../collections';

export const pubsub = new PubSub();
const resolvers = {
    Query: {
        Channels(root, args, context) {
            return Channels.find().fetch();
            return context.Channels.getChannels();
        },
        Channel(root, args, context) {
            return context.Channels.getChannel(args.name)
        }
    },
    Mutation: {
        addMessage(_, {channelName, message, handle}, context) {
            const newMessage = context.Channels.post(channelName, message, handle);
            const user = context.user;
            console.log("Add message by", user);
            console.log("in add message");
            if(user){
                pubsub.publish('messageAdded', newMessage);
                console.log("after messaging");
                return newMessage;
            }
        },
        addChannel(_, {channelName}, context) {
            // Meteor._sleepForMs(5000);
            context.Channels.createChannel(channelName);
            return context.Channels.getChannel(channelName);
        }
    },
    Subscription: {
        messageAdded(message) {
            console.log("message", message);
            return message;
        }
    }
};

export default resolvers;