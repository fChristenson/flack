const Chat = require("./Chat");
const createElement = require("../../lib/createElement");
const chatElement = document.querySelector("[data-js=chat-text]");

const chat = new Chat();
window.chat = chat;
const chatNode = createElement(chat);

chatElement.parentNode.replaceChild(chatNode, chatElement);

chat.refs.text.scrollTop = chat.refs.text.scrollHeight;
