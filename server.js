const app = require("./src/app");
const mongoose = require("mongoose");
const config = require("./src/config");

mongoose.connect(config.url, {
  useNewUrlParser: true
});

app.listen(process.env.PORT || 3000);

process.on("unhandledRejection", e => {
  console.log(e.message);
  process.exit(1);
});
