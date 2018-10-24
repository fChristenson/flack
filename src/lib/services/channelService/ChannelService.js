class ChannelService {
  constructor(Model) {
    this.Model = Model;
    this.getChannel = this.getChannel.bind(this);
    this.getChannels = this.getChannels.bind(this);
    this.getPublicChannels = this.getPublicChannels.bind(this);
    this.createChannel = this.createChannel.bind(this);
  }

  async createChannel(name, type, usersInChannel) {
    const fingerprint = Buffer.from(name.split("").sort().join("")).toString(
      "base64"
    );
    const channel = await this.Model.findOne({ fingerprint });

    if (channel) return channel;

    return new this.Model({
      name,
      fingerprint,
      type,
      usersInChannel
    }).save();
  }

  getChannel(channelId) {
    return this.Model.findById(channelId);
  }

  getChannels(userId) {
    return this.Model.find({ usersInChannel: userId });
  }

  getPublicChannels() {
    return this.Model.find({ type: "channel" });
  }
}

module.exports = ChannelService;
