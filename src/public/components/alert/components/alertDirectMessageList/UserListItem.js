const Component = require("../../../component");

class UserListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <li data-username="${this.props.user.username}" class="alert__user-list-item">
        <div>
          <div class="alert__user-list-item-image"></div>
        </div>
        <span class="alert__user-list-item-name">${this.props.user.username}</span>
      </li>
    `;
  }
}

module.exports = UserListItem;
