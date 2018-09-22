const postcssImports = require("postcss-import");

module.exports = {
  parser: "postcss",
  plugins: [postcssImports()]
};
