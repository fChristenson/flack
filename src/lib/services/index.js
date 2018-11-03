const ChannelService = require("./channelService/ChannelService");
const ChannelModel = require("./channelService/ChannelModel");
const MessageService = require("./messageService/MessageService");
const ReplyModel = require("./replyService/ReplyModel");
const MessageModel = require("./messageService/MessageModel");
const ReplyService = require("./replyService/ReplyService");
const UserService = require("./userService/UserService");
const UserModel = require("./userService/UserModel");
const channelService = new ChannelService(ChannelModel);
const userService = new UserService(UserModel, channelService);
const messageService = new MessageService(MessageModel, userService);
const replyService = new ReplyService(ReplyModel, messageService, userService);

module.exports = {
  userService,
  replyService,
  messageService,
  channelService
};
