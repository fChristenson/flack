const SimpleQueryStringBody = require("./SimpleQueryStringBody");
const MessageSearchResultView = require("./MessageSearchResultView");

class SearchService {
  constructor(client, channelService) {
    this.client = client;
    this.channelService = channelService;
    this.saveMessage = this.saveMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.findMessages = this.findMessages.bind(this);
    this._getBody = this._getBody.bind(this);
  }

  async findMessages(q, userId) {
    const channels = await this.channelService.getChannelsUserIsIn(userId);
    const response = await this.client.search({
      body: SimpleQueryStringBody(q, channels),
      sort: "createdAt"
    });

    return response.hits.hits.map(MessageSearchResultView);
  }

  deleteMessage(messageId) {
    return this.client.delete({
      ignore: [404],
      type: "message",
      id: messageId,
      index: "messages"
    });
  }

  updateMessage(messageView) {
    return this.client.update({
      index: "messages",
      id: messageView._id.toString(),
      type: "message",
      body: {
        doc: this._getBody(messageView)
      }
    });
  }

  saveMessage(messageView) {
    return this.client.create({
      index: "messages",
      id: messageView._id.toString(),
      type: "message",
      body: this._getBody(messageView)
    });
  }

  _getBody(messageView) {
    return Object.assign({}, messageView, {
      _id: undefined,
      replyMessages: undefined
    });
  }
}

module.exports = SearchService;
