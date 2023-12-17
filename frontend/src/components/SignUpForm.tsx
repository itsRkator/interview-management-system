// SignUpForm.tsx
import React, { useState } from "react";
import { signUp } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpForm.module.css";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUp(
        username,
        firstName,
        lastName,
        password,
        confirmPassword
      );
      if (response.success) {
        navigate("/signin");
      } else {
        setError("Sign-Up failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className={styles["signup-form"]}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className={styles["input-field"]}
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className={styles["input-field"]}
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles["input-field"]}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles["input-field"]}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className={styles["input-field"]}
        />
        <button type="submit" className={styles["signup-button"]}>
          Sign Up
        </button>
        {error && <p className={styles["error-message"]}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
