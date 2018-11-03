const Component = require("../../../component");
const MessageTextArea = require("../../../messageTextArea/MessageTextArea");

class EditText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.setChild(
      "textarea",
      new MessageTextArea({
        text: this.props.text,
        heightVariableString: "--edit-message-height",
        textAreaName: "edit-text",
        placeholderText: "",
        className: "chat__edit-text-textarea",
        dataJsName: "edit-text-area",
        onKeyupString: `chat.editMessage(event, '${this.props.messageId}')`
      })
    );
    return `
      <div data-js="edit-text" class="chat__edit-text">
        <template data-child="textarea"></template>
        <div class="chat__edit-text-button-container">
          <button onclick="chat.cancelEdit(event, '${this.props.messageId}')" class="chat__edit-text-cancel">Cancel</button>
          <button onclick="chat.saveUpdatedMessage(event, '${this.props.messageId}')" class="chat__edit-text-save">Save Changes</button>
        </div>
      </div>
    `;
  }
}

module.exports = EditText;
