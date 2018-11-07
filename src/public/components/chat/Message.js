class Message {
  constructor(incomingMessage) {
    this.id = incomingMessage._id || "";
    this.userId = incomingMessage.userId || "";
    this.replyMessages = incomingMessage.replyMessages || [];
    this.channelId = incomingMessage.channelId || "";
    this.username =
      (incomingMessage.user && incomingMessage.user.username) || "";
    this.createdAt = this._formatDate(incomingMessage);
    this.text = incomingMessage.text.replace(/\n/g, "<br/>") || "";
    this._formatDate = this._formatDate.bind(this);
  }

  _formatDate(incomingMessage) {
    let maybeCreatedAt;

    try {
      const array = incomingMessage.createdAt.split("T");
      const date = array[0];
      const time = array[1].substring(0, 5);

      maybeCreatedAt = `${date} ${time}`;
    } catch (error) {
      maybeCreatedAt = "";
    }

    return maybeCreatedAt;
  }
}

module.exports = Message;
