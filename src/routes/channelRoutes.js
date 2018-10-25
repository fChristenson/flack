const express = require("express");
const catchError = require("../lib/utils/catchError");
const CurrentUserView = require("../lib/services/userService/CurrentUserView");
const router = express.Router();
const isLoggedIn = require("../lib/utils/isLoggedIn");
const { channelService, userService } = require("../lib/services");

router.get(
  "/api/v1/channels/all",
  isLoggedIn,
  catchError(async (req, res) => {
    const channels = await channelService.getPublicChannels();
    res.json(channels);
  })
);

router.get(
  "/api/v1/channels",
  isLoggedIn,
  catchError(async (req, res) => {
    const channels = await channelService.getChannels(req.session.userId);
    res.json(channels);
  })
);

router.get(
  "/api/v1/channels/:channelId",
  isLoggedIn,
  catchError(async (req, res) => {
    const { channelId } = req.params;
    const channel = await channelService.getChannel(channelId);
    res.json(channel);
  })
);

router.post(
  "/api/v1/channels",
  isLoggedIn,
  catchError(async (req, res) => {
    const { name, usersInChannel, type } = req.body;
    const channel = await channelService.createChannel(
      name,
      type,
      usersInChannel
    );
    res.json(channel);
  })
);

router.put(
  "/api/v1/channels/:channelId/last-visit",
  isLoggedIn,
  catchError(async (req, res) => {
    const { userId } = req.session;
    const { channelId } = req.params;
    const user = await userService.setLastVisitedChannel(userId, channelId);
    res.json(new CurrentUserView(user));
  })
);

router.put(
  "/api/v1/channels/:channelId/join",
  isLoggedIn,
  catchError(async (req, res) => {
    const { userId } = req.session;
    const { channelId } = req.params;
    const channel = await channelService.joinChannel(userId, channelId);
    res.json(channel);
  })
);

module.exports = router;
