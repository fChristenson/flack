const createElement = require("../../lib/createElement");
const Alert = require("./Alert");
const alert = document.querySelector("[data-js=alert]");
require("./components/alertDirectMessageList");

window.alertModal = new Alert();
const alertNode = createElement(window.alertModal);

alert.parentNode.replaceChild(alertNode, alert);
