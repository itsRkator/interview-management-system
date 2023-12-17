const express = require("express");

const authMiddleware = require("../config/auth");

const router = express.Router();

const {
  addInterview,
  deleteInterview,
  getInterviews,
  updateInterview,
} = require("../controllers/interviewController");

router.post("/add", authMiddleware, addInterview);
router.delete("/delete/:id", authMiddleware, deleteInterview);
router.get("/all", authMiddleware, getInterviews);
router.put("/update/:id", authMiddleware, updateInterview);

module.exports = router;
