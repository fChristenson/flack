const express = require("express");
const catchError = require("../lib/utils/catchError");
const UserView = require("../lib/services/userService/UserView");
const router = express.Router();
const isLoggedIn = require("../lib/utils/isLoggedIn");
const { userService } = require("../lib/services");

router.get(
  "/api/v1/logged-in",
  catchError(async (req, res) => {
    const userView = await userService.getCurrentUserView(req.session.userId);
    res.json(userView);
  })
);

router.get(
  "/api/v1/users",
  isLoggedIn,
  catchError(async (req, res) => {
    const users = await userService.getUsersInChat();
    res.json(users.map(user => new UserView(user)));
  })
);

module.exports = router;
