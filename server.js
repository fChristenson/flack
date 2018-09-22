const app = require("./src/app");

app.listen(process.env.PORT || 3000);

process.on("unhandledRejection", e => {
  console.log(e.message);
  process.exit(1);
});
