const User = incomingUser => {
  return {
    id: incomingUser.id || "",
    username: incomingUser.username || "",
    lastVisitedChannelId: incomingUser.lastVisitedChannelId || "",
    unreadMessages: incomingUser.unreadMessages || {}
  };
};

module.exports = User;
