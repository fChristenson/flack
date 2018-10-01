const UserView = user => {
  return {
    username: user.username,
    lastVisitedChannel: user.lastVisitedChannel
  };
};

module.exports = UserView;
