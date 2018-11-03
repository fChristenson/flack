const Message = require("../../../chat/Message");

class Reply extends Message {
  constructor(incomingMessage) {
    super(incomingMessage);
    this.messageId = incomingMessage.messageId || "";
  }
}

module.exports = Reply;
