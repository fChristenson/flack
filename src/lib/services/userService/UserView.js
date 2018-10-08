const UserView = user => {
  return {
    id: user._id,
    username: user.username,
    lastVisitedChannel: user.lastVisitedChannel
  };
};

module.exports = UserView;
