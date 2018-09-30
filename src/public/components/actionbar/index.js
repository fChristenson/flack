const Actionbar = require("./Actionbar");
const createElement = require("../../lib/createElement");
const actionbarElement = document.querySelector("[data-js=actionbar]");

const actionbar = new Actionbar();
window.actionbar = actionbar;
const actionbarNode = createElement(actionbar);

actionbarElement.parentNode.replaceChild(actionbarNode, actionbarElement);
