// AddCandidateForm.tsx
import React, { useState } from "react";
import { addCandidate } from "../services/api";
import styles from "./AddCandidateForm.module.css"; // Import CSS module for styling
import { useNavigate } from "react-router-dom";

const AddCandidateForm: React.FC = () => {
  const [candidateName, setCandidateName] = useState("");
  const [interviewStatus, setInterviewStatus] = useState("");
  const [interviewFeedback, setInterviewFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCandidate({
        candidateName,
        interviewStatus,
        interviewFeedback,
        rating,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Failed to add candidate.");
    }
  };
  return (
    <div className={styles["add-candidate-form"]}>
      <h2>Add Candidate</h2>
      <form onSubmit={handleAddCandidate}>
        <label className={styles["form-label"]}>
          Candidate Name:{" "}
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className={styles["input-field"]}
          />
        </label>
        <label className={styles["form-label"]}>
          Interview Status:{" "}
          <input
            type="text"
            value={interviewStatus}
            onChange={(e) => setInterviewStatus(e.target.value)}
            className={styles["input-field"]}
          />
        </label>
        <label className={styles["form-label"]}>
          Interview Feedback:{" "}
          <input
            type="text"
            value={interviewFeedback}
            onChange={(e) => setInterviewFeedback(e.target.value)}
            className={styles["input-field"]}
          />
        </label>
        <label className={styles["form-label"]}>
          Rating:{" "}
          <input
            type="number"
            value={rating?rating: ""}
            step={1}
            onChange={(e) => setRating(Math.floor(+e.target.value))}
            className={styles["input-field"]}
          />
        </label>
        <button type="submit" className={styles["submit-button"]}>
          Add Candidate
        </button>
        {error && <p className={styles["error-message"]}>{error}</p>}
      </form>
    </div>
  );
};

export default AddCandidateForm;
