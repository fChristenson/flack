const Request = require("./Request");

const updateMessage = async (messageId, text) => {
  const req = Request("PUT", { text });
  const res = await fetch(`/api/v1/messages/${messageId}`, req);
  return res.json();
};

const deleteMessage = async messageId => {
  const req = Request("DELETE");
  const res = await fetch(`/api/v1/messages/${messageId}`, req);
  return res.json();
};

const getMessages = async channelId => {
  const req = Request("GET");
  const res = await fetch(`/api/v1/messages/${channelId}`, req);
  return res.json();
};

module.exports = {
  deleteMessage,
  getMessages,
  updateMessage
};
