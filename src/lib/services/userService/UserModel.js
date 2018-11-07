const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  lastVisitedChannelId: { type: String },
  unreadMessages: { type: Map, of: Number }
});

module.exports = mongoose.model("user", user);
