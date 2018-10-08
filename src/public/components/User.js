const User = incomingUser => {
  return {
    id: incomingUser.id || "",
    username: incomingUser.username || "",
    lastVisitedChannel: incomingUser.lastVisitedChannel || ""
  };
};

module.exports = User;
