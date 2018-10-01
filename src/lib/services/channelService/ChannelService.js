class ChannelService {
  constructor(Model) {
    this.Model = Model;
    this.getChannel = this.getChannel.bind(this);
    this.getChannels = this.getChannels.bind(this);
    this.createChannel = this.createChannel.bind(this);
  }

  createChannel(name) {
    return new this.Model({ name }).save();
  }

  getChannel(channelId) {
    return this.Model.findById(channelId);
  }

  getChannels() {
    return this.Model.find({});
  }
}

module.exports = ChannelService;
