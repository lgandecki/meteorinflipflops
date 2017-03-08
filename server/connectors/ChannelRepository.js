import { Channels } from '../collections';

export default class ChannelRepository {
    getChannels() {
        console.log("getChannels")
        return Channels.find().fetch();
    }
    getChannel(name) {
        console.log("getChannel by ", name);
        return Channels.findOne({name});
    }
    createChannel(name) {
        const newChannel = {name, messages: []}
        if (Channels.insert(newChannel)) {
            return newChannel;
        }
    }
    post(channelName, text, handle) {
        const newMessage = {message: text, handle}

        const updateSucceded = Channels.update({name: channelName}, {$addToSet: {messages: newMessage}});
        if (updateSucceded) {
            return newMessage;
        } else {
            throw new Error("Channel " + channelName + " doesn't exist")
        }
    }
}