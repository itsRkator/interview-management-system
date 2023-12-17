// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/SignUpForm";
import NavBar from "./components/NavBar";
import { isAuthenticated, logout } from "./utils/auth";

const App: React.FC = () => {
  const isLoggedIn = isAuthenticated();
  if (!isLoggedIn) {
    logout();
  }
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path={"/dashboard"}
          element={isLoggedIn ? <Dashboard /> : <SignInForm />}
        />
        <Route
          path={"/"}
          element={isLoggedIn ? <Dashboard /> : <SignInForm />}
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path={"/signin"} element={<SignInForm />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
