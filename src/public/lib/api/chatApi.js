const Request = require("./Request");

const getMessages = async channelId => {
  const req = Request("GET");
  const res = await fetch(`/api/v1/messages/${channelId}`, req);
  return res.json();
};

module.exports = {
  getMessages
};
