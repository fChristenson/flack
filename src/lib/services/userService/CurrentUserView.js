const UserView = require("./UserView");

class CurrentUserView extends UserView {
  constructor(user) {
    super(user);
    this.lastVisitedChannelId = user.lastVisitedChannelId;
  }
}

module.exports = CurrentUserView;
