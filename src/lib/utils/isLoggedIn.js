const StatusError = require("./StatusError");
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) return next();

  return next(new StatusError("Unauthorized", 401));
};

module.exports = isLoggedIn;
