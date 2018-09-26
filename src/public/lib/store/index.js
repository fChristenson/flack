const Store = require("./Store");

const store = new Store();

window.__STATE__ = store.state;

module.exports = store;
