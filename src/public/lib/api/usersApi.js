const Request = require("./Request");

const isLoggedIn = async () => {
  const req = Request("GET");
  const res = await fetch("/api/v1/logged-in", req);
  return res.json();
};

const getUsersInChat = async channelId => {
  const req = Request("GET");
  const res = await fetch("/api/v1/users", req);
  return res.json();
};

module.exports = {
  isLoggedIn,
  getUsersInChat
};
