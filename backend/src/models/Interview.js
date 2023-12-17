const mongoose = require("mongoose");

const interviewSchema = mongoose.Schema({
  candidateName: { type: String, required: true },
  interviewStatus: { type: String, required: true },
  interviewFeedback: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Interview", interviewSchema);
