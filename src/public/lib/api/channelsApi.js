const Request = require("./Request");

const createChannel = async name => {
  const req = Request("POST", { name });
  const res = await fetch("/api/v1/channels", req);
  return res.json();
};

const getChannels = async () => {
  const req = Request("GET");
  const res = await fetch("/api/v1/channels", req);
  return res.json();
};

module.exports = {
  createChannel,
  getChannels
};
