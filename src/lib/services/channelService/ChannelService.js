class ChannelService {
  constructor(Model) {
    this.Model = Model;
    this.getChannel = this.getChannel.bind(this);
    this.getChannelByName = this.getChannelByName.bind(this);
    this.getChannels = this.getChannels.bind(this);
    this.getPublicChannels = this.getPublicChannels.bind(this);
    this.createChannel = this.createChannel.bind(this);
    this.joinChannel = this.joinChannel.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
  }

  async createChannel(userId, name, type, usersInChannel) {
    const fingerprint = Buffer.from(name.split("").sort().join("")).toString(
      "base64"
    );
    const channel = await this.Model.findOne({ fingerprint });

    if (!channel) {
      return new this.Model({
        name,
        fingerprint,
        type,
        usersInChannel
      }).save();
    }

    const isInChannel = channel.usersInChannel.find(id => id === userId);

    if (isInChannel) return channel;

    channel.usersInChannel.push(userId);

    return channel.save();
  }

  getChannel(channelId) {
    return this.Model.findById(channelId);
  }

  getChannelByName(name) {
    return this.Model.findOne({ name });
  }

  async joinChannel(userId, channelId) {
    const channel = await this.Model.findById(channelId);
    const isInChannel = channel.usersInChannel.find(id => id === userId);

    if (isInChannel) return channel;

    channel.usersInChannel.push(userId);

    return channel.save();
  }

  async leaveChannel(userId, channelId) {
    const channel = await this.Model.findById(channelId);
    const users = channel.usersInChannel.filter(id => id !== userId);

    channel.usersInChannel = users;

    return channel.save();
  }

  getChannels(userId) {
    return this.Model.find({ usersInChannel: userId });
  }

  getPublicChannels() {
    return this.Model.find({ type: "channel" });
  }
}

module.exports = ChannelService;
