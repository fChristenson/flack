const express = require("express");
const catchError = require("../lib/utils/catchError");
const router = express.Router();
const isLoggedIn = require("../lib/utils/isLoggedIn");
const { messageService } = require("../lib/services");

router.get(
  "/api/v1/messages/:channelId",
  isLoggedIn,
  catchError(async (req, res) => {
    const { channelId } = req.params;
    const views = await messageService.getMessageViews(channelId);
    res.json(views);
  })
);

router.delete(
  "/api/v1/messages/:messageId",
  isLoggedIn,
  catchError(async (req, res) => {
    const { messageId } = req.params;
    const { userId } = req.session;
    const view = await messageService.deleteMessage(userId, messageId);
    res.json(view);
  })
);

router.put(
  "/api/v1/messages/:messageId",
  isLoggedIn,
  catchError(async (req, res) => {
    const { messageId } = req.params;
    const { userId } = req.session;
    const { text } = req.body;
    const view = await messageService.updateMessage(userId, messageId, text);
    res.json(view);
  })
);

module.exports = router;
