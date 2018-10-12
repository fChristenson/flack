const Component = require("../../../component");
const UserListItem = require("./UserListItem");
const { FilterDirectMessages } = require("../../alertActions");
const { FILTER_DIRECT_MESSAGES } = require("../../alertEvents");

class AlertDirectMessageList extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
    this.setSubscriber("alertDirectMessagesList", this.onEvent);
    this.renderUser = this.renderUser.bind(this);
  }

  filterUsers(event) {
    event.preventDefault();
    const text = event.target.value;
    this.dispatch(FilterDirectMessages(text));
  }

  onEvent(state, action) {
    if (action.type === FILTER_DIRECT_MESSAGES) {
      const items = Object.values(this.refs.userList.childNodes);
      const regex = new RegExp(`^${action.value}`);

      items.forEach(element => {
        element.classList.remove("alert__li--hide");
        if (!regex.test(element.getAttribute("data-username"))) {
          element.classList.add("alert__li--hide");
        }
      });
    }
  }

  renderUser(user, index) {
    this.setChild(`item-${index}`, new UserListItem({ user }));
    return `<template data-child="item-${index}"></template>`;
  }

  render() {
    return `
      <div class="alert__direct-message-list">
        <form class="alert__direct-message-form">
          <input onkeyup="alertDirectMessageList.filterUsers(event)" class="alert__find-conversation" type="text" placeholder="Find or start a conversation" />
        </form>
        <ul data-ref="userList" class="alert__direct-message-ul">${this.props.users
      .map(this.renderUser)
      .join("")}</ul>
      </div>
    `;
  }
}

module.exports = AlertDirectMessageList;
