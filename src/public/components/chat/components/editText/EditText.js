const Component = require("../../../component");

class EditText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <div data-js="edit-text" class="chat__edit-text">
        <textarea onkeyup="chat.editMessage(event)" class="chat__edit-text-textarea" data-js="edit-text-area">${this.props.text}</textarea>
        <div class="chat__edit-text-button-container">
          <button onclick="chat.cancelEdit(event)" class="chat__edit-text-cancel">Cancel</button>
          <button onclick="chat.saveUpdatedMessage(event)" class="chat__edit-text-save">Save Changes</button>
        </div>
      </div>
    `;
  }
}

module.exports = EditText;
