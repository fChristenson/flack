const express = require("express");
const catchError = require("../lib/utils/catchError");
const { searchService } = require("../lib/services");
const router = express.Router();
const isLoggedIn = require("../lib/utils/isLoggedIn");

router.get(
  "/api/v1/search",
  isLoggedIn,
  catchError(async (req, res) => {
    const { userId } = req.session;
    const results = await searchService.findMessages(req.query.q, userId);
    res.json(results);
  })
);

module.exports = router;
