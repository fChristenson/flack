const express = require("express");
const path = require("path");
const catchError = require("../lib/utils/catchError");
const router = express.Router();
const isLoggedInWithRedirect = require("../lib/utils/isLoggedInWithRedirect");
const { userService } = require("../lib/services");

router.get(
  "/",
  isLoggedInWithRedirect,
  catchError((req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "dist", "main.html"));
  })
);

router.get(
  "/register",
  catchError(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "register.html"));
  })
);

router.get(
  "/login",
  catchError(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
  })
);

router.get(
  "/logout",
  catchError(async (req, res) => {
    req.session.destroy();
    res.redirect("/login");
  })
);

router.post(
  "/register",
  catchError(async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.registerUser(username, password);
    req.session.userId = user.id;
    res.redirect("/");
  })
);

router.post(
  "/login",
  catchError(async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.loginUser(username, password);
    req.session.userId = user.id;
    res.redirect("/");
  })
);

module.exports = router;
