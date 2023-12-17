// NavBar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, isAuthenticated } from "../utils/auth";
import styles from "./NavBar.module.css"; // Import CSS module for styling

const NavBar: React.FC = () => {
  const navigator = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout(); // Implement this function to clear authentication token from storage
    navigator("/signin"); // Redirect to sign-in page after logout
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.a}>
        Home
      </Link>
      <ul className={styles.ul}>
        {loggedIn ? (
          <>
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Log Out
              </button>
            </li>
            {/* Add more links for authenticated users */}
          </>
        ) : (
          <>
            <li>
              <Link to="/signin" className={styles.a}>
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup" className={styles.a}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
