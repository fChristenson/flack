const ChannelService = require("./channelService/ChannelService");
const ChannelModel = require("./channelService/ChannelModel");
const MessageService = require("./messageService/MessageService");
const MessageModel = require("./messageService/MessageModel");
const UserService = require("./userService/UserService");
const UserModel = require("./userService/UserModel");
const channelService = new ChannelService(ChannelModel);
const userService = new UserService(UserModel, channelService);
const messageService = new MessageService(MessageModel, userService);

module.exports = {
  userService,
  messageService,
  channelService
};
