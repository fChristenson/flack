const ChannelService = require("./channelService/ChannelService");
const ChannelModel = require("./channelService/ChannelModel");
const MessageService = require("./messageService/MessageService");
const ReplyModel = require("./replyService/ReplyModel");
const MessageModel = require("./messageService/MessageModel");
const ReplyService = require("./replyService/ReplyService");
const UserService = require("./userService/UserService");
const UserModel = require("./userService/UserModel");
const SearchService = require("./searchService/SearchService");
const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URI || "localhost:9200"
});

const channelService = new ChannelService(ChannelModel);
const searchService = new SearchService(client, channelService);
const userService = new UserService(UserModel, channelService);
const messageService = new MessageService(MessageModel, userService);
const replyService = new ReplyService(ReplyModel, messageService, userService);

module.exports = {
  searchService,
  userService,
  replyService,
  messageService,
  channelService
};
