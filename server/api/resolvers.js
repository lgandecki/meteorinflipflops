export const resolvers = {
    Query: {
        Channels(root, args, context) {
            return context.Channels.getChannels();
        },
        Channel(root, args, context) {
            return context.Channels.getChannel(args.name)
        }
    },
    Mutation: {
        addMessage(_, {channelName, message, handle}, context) {
            return context.Channels.post(channelName, message, handle);
        },
        addChannel(_, {channelName}, context) {
            Meteor._sleepForMs(5000);
            context.Channels.createChannel(channelName);
            return context.Channels.getChannel(channelName);
        }
    }
};