const Component = require("../../../component");

class Thread extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <div class="thread">
        This is a thread
      </div>
    `;
  }
}

module.exports = Thread;
