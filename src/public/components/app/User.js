const User = incomingUser => {
  return {
    id: incomingUser.id || "",
    username: incomingUser.username || "",
    lastVisitedChannelId: incomingUser.lastVisitedChannelId || ""
  };
};

module.exports = User;
