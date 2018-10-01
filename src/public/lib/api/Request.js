const Request = (method, data) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
};

module.exports = Request;
