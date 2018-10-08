const MessageView = require("./MessageView");

class MessageService {
  constructor(Model, userService) {
    this.userService = userService;
    this.Model = Model;
    this.getMessages = this.getMessages.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.getMessageViews = this.getMessageViews.bind(this);
    this.createMessageView = this.createMessageView.bind(this);
  }

  async createMessageView(userId, channelId, createdAt, text) {
    const message = await this.createMessage(
      userId,
      channelId,
      createdAt,
      text
    );
    const user = await this.userService.getUser(userId);
    return MessageView(message, user);
  }

  async getMessageViews(channelId) {
    const messages = await this.getMessages(channelId);
    const userIds = messages.map(message => message.userId);
    const users = await this.userService.getUsers(userIds);

    return messages.map(message => {
      const user = users.find(user => user.id === message.userId);
      return MessageView(message, user);
    });
  }

  createMessage(userId, channelId, createdAt, text) {
    return new this.Model({ userId, channelId, createdAt, text }).save();
  }

  getMessages(channelId) {
    return this.Model.find({ channelId });
  }
}

module.exports = MessageService;
