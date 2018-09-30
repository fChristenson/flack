const Component = require("../../../component");

class File extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <div class="thread">
        This is a file
      </div>
    `;
  }
}

module.exports = File;
