const MessageView = require("./MessageView");

class MessageService {
  constructor(Model, userService) {
    this.userService = userService;
    this.Model = Model;
    this.getMessage = this.getMessage.bind(this);
    this.getMessageView = this.getMessageView.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.getMessageViews = this.getMessageViews.bind(this);
    this.createMessageView = this.createMessageView.bind(this);
  }

  async deleteMessage(userId, messageId) {
    const message = await this.Model.findOne({ _id: messageId, userId });
    const update = await message.delete();
    const user = await this.userService.getUser(userId);
    return MessageView(update, user);
  }

  async updateMessage(userId, messageId, text) {
    const message = await this.Model.findOne({ _id: messageId, userId });
    message.text = text;
    const update = await message.save();
    const user = await this.userService.getUser(userId);
    return MessageView(update, user);
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

  async getMessageView(messageId) {
    const message = await this.getMessage(messageId);
    const user = await this.userService.getUser(message.userId);
    return MessageView(message, user);
  }

  getMessage(messageId) {
    return this.Model.findById(messageId);
  }

  getMessages(channelId) {
    return this.Model.find({ channelId });
  }
}

module.exports = MessageService;
