const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reply = new Schema({
  userId: { type: String, required: true },
  messageId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  text: { type: String, required: true }
});

module.exports = mongoose.model("reply", reply);
