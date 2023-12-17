// Dashboard.tsx
import React from "react";
import CandidateTable from "./CandidateTable";
import AddCandidateForm from "./AddCandidateForm";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["dashboard-section"]}>
        <AddCandidateForm />
      </div>
      <div className={styles["dashboard-section"]}>
        <CandidateTable />
      </div>
    </div>
  );
};

export default Dashboard;
