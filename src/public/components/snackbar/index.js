const Snackbar = require("./Snackbar");
const createElement = require("../../lib/createElement");
const snackbar = document.querySelector("[data-js=snackbar]");

window.snackbar = new Snackbar();

const snackbarNode = createElement(window.snackbar);

snackbar.parentNode.replaceChild(snackbarNode, snackbar);
