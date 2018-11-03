const Component = require("../component");
const {
  ADD_TEXT_AREA_ROW,
  RESET_TEXT_AREA_HEIGHT,
  SET_TEXT_AREA_HEIGHT
} = require("./messageTextAreaEvents");
const LINE_HEIGHT_IN_PIXELS = 14;
const TEXT_AREA_MAX_HEIGHT = 200;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this._createRow = this._createRow.bind(this);
    this.setSubscriber(`messageTextArea-${props.textAreaName}`, this.onEvent);
    document.body.style.setProperty(this.props.heightVariableString, 0);
  }

  onEvent(state, action) {
    if (
      action.type === SET_TEXT_AREA_HEIGHT &&
      action.value.textAreaName === this.props.textAreaName
    ) {
      for (let i = 0; i < action.value.height; i++) {
        this._createRow();
      }
    }

    if (
      action.type === RESET_TEXT_AREA_HEIGHT &&
      action.value === this.props.textAreaName
    ) {
      document.body.style.setProperty(this.props.heightVariableString, 0);
    }

    if (
      action.type === ADD_TEXT_AREA_ROW &&
      action.value === this.props.textAreaName
    ) {
      this._createRow();
    }
  }

  _createRow() {
    const heightString = document.body.style.getPropertyValue(
      this.props.heightVariableString
    );
    const height = parseInt(heightString || 0);
    const newHeight = Math.min(
      TEXT_AREA_MAX_HEIGHT,
      height + LINE_HEIGHT_IN_PIXELS
    );
    document.body.style.setProperty(this.props.heightVariableString, newHeight);
  }

  render() {
    return `
      <textarea data-js="${this.props.dataJsName}" onkeyup="${this.props.onKeyupString}" class="${this.props.className}" placeholder="${this.props.placeholderText}">${this.props.text}</textarea>
    `;
  }
}

module.exports = Chat;
