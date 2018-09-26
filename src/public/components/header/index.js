const createElement = require("../../lib/createElement");
const Header = require("./Header");
const headerElement = document.querySelector("[data-js=header]");
const header = new Header();
const headerNode = createElement(header);

window.header = header;
headerElement.parentNode.replaceChild(headerNode, headerElement);
