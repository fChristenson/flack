const isLoggedInWithRedirect = (req, res, next) => {
  if (req.session && req.session.userId) return next();

  res.redirect("/login");
};

module.exports = isLoggedInWithRedirect;
