const Channel = props => {
  return {
    id: props._id || "",
    name: props.name || "",
    selected: props.selected || false
  };
};

module.exports = Channel;
