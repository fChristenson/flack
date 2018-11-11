const Request = require("./Request");
const handleNetworkError = require("../handleNetworkError/handleNetworkError");

const isLoggedIn = async () => {
  const req = Request("GET");
  const res = await fetch("/api/v1/logged-in", req);
  return res.json();
};

const getUsersInChat = async () => {
  const req = Request("GET");
  const res = await fetch("/api/v1/users", req);
  return res.json();
};

const setUnreadMessages = async (channelId, unreadMessages) => {
  const req = Request("PUT", { unreadMessages });
  const res = await fetch(
    `/api/v1/channels/${channelId}/set-unread-messages`,
    req
  );
  return res.json();
};

module.exports = {
  isLoggedIn: handleNetworkError(isLoggedIn),
  setUnreadMessages: handleNetworkError(setUnreadMessages),
  getUsersInChat: handleNetworkError(getUsersInChat)
};
