const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  lastVisitedChannel: { type: String, default: "general" }
});

module.exports = mongoose.model("user", user);
