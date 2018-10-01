const app = require("./src/app");
const mongoose = require("mongoose");

const url = process.env.MONGO_URL || "mongodb://localhost:27017/local";
mongoose.connect(url, {
  useNewUrlParser: true
});

app.listen(process.env.PORT || 3000);

process.on("unhandledRejection", e => {
  console.log(e.message);
  process.exit(1);
});
