const Channel = (props, currentUser) => {
  const name = props.type === "directMessage"
    ? getName(props.name, currentUser)
    : props.name;

  return {
    id: props._id || "",
    name: name || "",
    type: props.type || ""
  };
};

const getName = (name, currentUser) => {
  if (!name) return "";
  const regex = new RegExp(`${currentUser.username}`);
  return name.replace(regex, "").split(",").filter(str => str).join(",");
};

module.exports = Channel;
