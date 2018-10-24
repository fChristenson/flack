const Request = require("./Request");

const createChannel = async (name, usersInChannel, type) => {
  const req = Request("POST", { name, usersInChannel, type });
  const res = await fetch("/api/v1/channels", req);
  return res.json();
};

const getChannel = async channelId => {
  const req = Request("GET");
  const res = await fetch(`/api/v1/channels/${channelId}`, req);
  return res.json();
};

const getAllChannels = async () => {
  const req = Request("GET");
  const res = await fetch("/api/v1/channels/all", req);
  return res.json();
};

const getChannels = async () => {
  const req = Request("GET");
  const res = await fetch("/api/v1/channels", req);
  return res.json();
};

const setLastVisitedChannel = async channelId => {
  const req = Request("PUT");
  const res = await fetch(`/api/v1/channels/${channelId}/last-visit`, req);
  return res.json();
};

module.exports = {
  createChannel,
  getAllChannels,
  getChannel,
  setLastVisitedChannel,
  getChannels
};
