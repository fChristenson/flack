const Chat = require("./Chat");
const Post = require("./Post");
const createElement = require("../../lib/createElement");
const chatElement = document.querySelector("[data-js=chat-text]");

const incomingPost = {
  imageUrl: "https://ca.slack-edge.com/T0K3BDXT3-U0XHYV6S3-3905df6f4e1e-48",
  username: "Fredrik",
  createdAt: new Date().toISOString(),
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. \n\n Qui ut sequi iusto maxime explicabo a molestiae nam minus quidem quibusdam, quis assumenda tempore laudantium voluptate reiciendis praesentium? Itaque, laborum nostrum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ut sequi iusto maxime explicabo a molestiae nam minus quidem quibusdam, quis assumenda tempore laudantium voluptate reiciendis praesentium? Itaque, laborum nostrum!"
};

const posts = [
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost),
  Post(incomingPost)
];

const chat = new Chat({ posts });
window.chat = chat;
const chatNode = createElement(chat);

chatElement.parentNode.replaceChild(chatNode, chatElement);

chat.refs.text.scrollTop = chat.refs.text.scrollHeight;
