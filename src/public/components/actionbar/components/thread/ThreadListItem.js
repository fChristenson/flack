const Component = require("../../../component");

class ThreadListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <li data-message="${this.props.message.id}" class="thread__li">
        <div>
          <div class="thread__img"></div>
        </div>
        <div class="thread__li-content">
          <div>
            <span class="thread__username">${this.props.message.username}</span>
            <span class="thread__date">${this.props.message.createdAt}</span>
          </div>
          <div data-js="text-${this.props.message.id}" class="thread__text">${this.props.message.text}</div>
        </div>
      </li>
    `;
  }
}

module.exports = ThreadListItem;
