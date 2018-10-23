const {
  SET_SELECTED_CHANNEL,
  SET_CHANNELS,
  ADD_CHANNEL
} = require("./sidebarEvents");

module.exports = (state, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      const isInArray = state.channels.find(
        channel => channel.id === action.value.id
      );
      if (isInArray) return state;
      return Object.assign({}, state, {
        channels: state.channels.concat([action.value])
      });

    case SET_CHANNELS:
      return Object.assign({}, state, { channels: action.value });

    case SET_SELECTED_CHANNEL:
      return Object.assign({}, state, {
        selectedChannel: action.value
      });

    default:
      return state;
  }
};
