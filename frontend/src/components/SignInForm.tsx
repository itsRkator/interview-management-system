// SignInForm.tsx
import React, { useState } from "react";
import { signIn } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./SignInForm.module.css"; // Import CSS module for styling

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn(username, password);

      if (response.success) {
        localStorage.setItem("token", response.token ?? "");
        navigator("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles["signin-container"]}>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn} className={styles["signin-form"]}>
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
        <button type="submit" className={styles["signin-button"]}>
          Sign In
        </button>
        {error && <p className={styles["error-message"]}>{error}</p>}
      </form>
    </div>
  );
};

export default SignInForm;
