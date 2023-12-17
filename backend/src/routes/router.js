const express = require("express");

const authRoutes = require("./authRoutes");
const interviewRoutes = require('./interviewRoutes')

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/interview", interviewRoutes);

module.exports = router;
