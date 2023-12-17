// CandidateTable.tsx
import React, { useEffect, useState } from "react";
import { fetchCandidates, Candidate } from "../services/api";
import styles from "./CandidateTable.module.css";

const CandidateTable: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const data = await fetchCandidates();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    getCandidates();
  }, []);

  const renderStars = (rating: number): JSX.Element => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
    const hasExtraHalfStar = decimal >= 0.75;
    const emptyStars =
      maxStars - fullStars - (hasHalfStar ? 1 : 0) - (hasExtraHalfStar ? 1 : 0);

    const starArray = [];

    for (let i = 0; i < fullStars; i++) {
      starArray.push(<span key={i}>&#9733;</span>); // Full star Unicode
    }

    if (hasHalfStar) {
      starArray.push(<span key={fullStars}>&#9734;&#9733;</span>); // Half-filled star Unicode
    } else if (hasExtraHalfStar) {
      starArray.push(<span key={fullStars}>&#9733;&#9733;</span>); // Extra half-filled star Unicode
    }

    for (let j = 0; j < emptyStars; j++) {
      starArray.push(<span key={maxStars - j}>&#9734;</span>); // Empty star Unicode
    }

    return <>{starArray}</>;
  };

  return (
    <div className={styles["candidate-table-container"]}>
      <h2>Candidate Table</h2>
      <table className={styles["table"]}>
        <thead>
          <tr className={styles["table-row"]}>
            <th className={styles["table-header"]}>Candidate Name</th>
            <th className={styles["table-header"]}>Interview Status</th>
            <th className={styles["table-header"]}>Interview Feedback</th>
            <th className={styles["table-header"]}>Rating</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} className={styles["table-row"]}>
              <td className={styles["table-data-name"]}>
                {candidate.candidateName}
              </td>
              <td className={styles["table-data-status"]}>
                {candidate.interviewStatus}
              </td>
              <td className={styles["table-data-feedback"]}>
                {candidate.interviewFeedback}
              </td>
              <td className={styles["table-data-rating"]}>
                {renderStars(Number(candidate.rating))}
              </td>
              {/* Add more table cells for other candidate fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
