const Request = require("./Request");

const getSearchResults = async query => {
  const req = Request("GET");
  const res = await fetch(`/api/v1/search?q=${query}`, req);
  return res.json();
};

module.exports = {
  getSearchResults
};
