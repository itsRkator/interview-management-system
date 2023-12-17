const Interview = require("../models/Interview");

const addInterview = async (req, res) => {
  try {
    const { candidateName, interviewStatus, interviewFeedback, rating } =
      req.body;
    const interview = new Interview({
      candidateName,
      interviewStatus,
      interviewFeedback,
      rating,
    });
    await interview.save();
    return res.status(201).json({ message: "Interview added successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error adding interview" });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const interviewId = req.params.id;
    await Interview.findByIdAndDelete(interviewId);
    res.status(200).json({ message: "Interview deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting interview" });
  }
};

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    return res.status(200).json({ message: "Data fetched successfully", data: interviews });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching interviews" });
  }
};

const updateInterview = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const { candidateName, interviewStatus, interviewFeedback, rating } =
      req.body;

    await Interview.findByIdAndUpdate(interviewId, {
      candidateName,
      interviewStatus,
      interviewFeedback,
      rating,
    });
    return res.status(200).json({ message: "Interview updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error updating interview" });
  }
};

module.exports = {
  addInterview,
  deleteInterview,
  getInterviews,
  updateInterview,
};
