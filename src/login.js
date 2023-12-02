import React, { useState, useEffect } from "react";
import "./login.css";
import Signup from "./signup";
import { auth, signInWithEmailAndPassword, signOut } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "./Profile";

const Login = ({ setCurrentPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      console.log("User successfully logged in!");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      // Using signOut from the auth module to log out the user
      await signOut(auth);
      console.log("User successfully logged out!");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleSignupLinkClick = () => {
    setCurrentPage("signup");
  };

  return (
    <div className="login-container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <Profile />
        </div>
      ) : (
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={handleLogin}>
            Login
          </button>

          <div className="signup-link">
            <p>
              Don't have an account?{" "}
              <span
                onClick={handleSignupLinkClick}
                className="signup-link-text"
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
