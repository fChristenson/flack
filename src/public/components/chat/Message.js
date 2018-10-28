module.exports = incomingMessage => {
  let maybeCreatedAt;

  try {
    const array = incomingMessage.createdAt.split("T");
    const date = array[0];
    const time = array[1].substring(0, 5);

    maybeCreatedAt = `${date} ${time}`;
  } catch (error) {
    maybeCreatedAt = "";
  }

  return {
    id: incomingMessage._id || "",
    channelId: incomingMessage.channelId || "",
    username: (incomingMessage &&
      incomingMessage.user &&
      incomingMessage.user.username) ||
      "",
    createdAt: maybeCreatedAt,
    text: incomingMessage.text.replace(/\n/g, "<br/>") || ""
  };
};
