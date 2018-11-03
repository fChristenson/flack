const ReplyView = require("./ReplyView");

class ReplyService {
  constructor(Model, messageService, userService) {
    this.Model = Model;
    this.messageService = messageService;
    this.userService = userService;
    this.createReplyView = this.createReplyView.bind(this);
    this.getReplyViews = this.getReplyViews.bind(this);
  }

  async getReplyViews(messageId) {
    const message = await this.messageService.getMessage(messageId);
    const replies = await this.Model.find({ messageId });
    const userIdArray = replies.map(reply => reply.userId);
    const users = await this.userService.getUsers(userIdArray);

    return replies.map(reply => {
      const user = users.find(user => user.id === reply.userId);
      return ReplyView(reply, user, message.channelId);
    });
  }

  async createReplyView(userId, channelId, messageId, createdAt, text) {
    const message = await this.messageService.getMessage(messageId);
    const reply = await this.Model({
      userId,
      createdAt,
      text,
      messageId: message.id
    }).save();

    message.replyMessages.push(reply.id);
    await message.save();
    const user = await this.userService.getUser(userId);

    return ReplyView(reply, user, channelId);
  }
}

module.exports = ReplyService;
