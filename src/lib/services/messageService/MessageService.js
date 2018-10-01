class MessageService {
  constructor(Model) {
    this.Model = Model;
    this.getMessages = this.getMessages.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  createMessage(userId, channelId, createdAt, text) {
    return new this.Model({ userId, channelId, createdAt, text }).save();
  }

  getMessages(channelId) {
    return this.Model.find({ channelId });
  }
}

module.exports = MessageService;
