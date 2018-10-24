const Component = require("../../../../../component");
const { createChannel } = require("../../../../../../lib/api/channelsApi");
const Channel = require("../../../../../sidebar/Channel");
const { CloseAlert } = require("../../../../alertActions");

class CreateChannel extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
  }

  onKeyup(event) {
    event.preventDefault();
    if (event.target.value.length > 0) {
      this.refs.createButton.disabled = false;
    } else {
      this.refs.createButton.disabled = true;
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    if (this.refs.createButton.disabled) return;
    const name = this.refs.name.value;
    const user = this.getStoreState().app.user;
    const usersInChannel = [user.id];
    const type = "channel";
    const incomingChannel = await createChannel(name, usersInChannel, type);
    const channel = Channel(incomingChannel, user);
    this.dispatch(CloseAlert());
    window.location.hash = `#/channels/${channel.id}`;
  }

  render() {
    return `
    <div>
      <header class="alert__header">
        <button class="alert__button" onclick="alertModal.close()">
          <div class="alert__times">&times;</div>
          esc
        </button>
      </header>
      <div class="alert__content-container">
        <div class="alert__channel-header">
          <h1>Create a channel</h1>
        </div>
        <p class="create-channel__description">Channels are where your members communicate. They’re best when organized around a topic — #leads, for example.</p>
        <form onsubmit="createChannel.onSubmit(event)" class="create-channel__form">
          <div class="create-channel__field-container">
            <input onkeyup="createChannel.onKeyup(event)" data-ref="name" class="create-channel__field" type="text" placeholder="e.g leads" />
          </div>
        </form>
        <div class="create-channel__button-container">
          <button class="create-channel__button" onclick="alertModal.close()">Cancel</button>
          <button onclick="createChannel.onSubmit(event)" data-ref="createButton" class="create-channel__button--green" disabled>Create Channel</button>
        </div>
      </div>
    </div>`;
  }
}

module.exports = CreateChannel;
