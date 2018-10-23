class UserView {
  constructor(user) {
    this.id = user._id;
    this.username = user.username;
  }
}

module.exports = UserView;
