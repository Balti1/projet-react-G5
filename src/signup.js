// Signup.js
import React, { useState } from "react";
import "./signup.css";
import { getDatabase, ref, set } from "firebase/database";
import { auth, database } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

// ... rest of your code ...

const Signup = ({ setCurrentPage }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Send a verification email
        sendEmailVerification(user)
          .then(() => {
            console.log("Verification email sent successfully!");
            // You can add a message or redirect the user to a page informing them to check their email
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
          });

        // Continue with the rest of your logic, e.g., storing user data in the database
        const userId = user.uid;
        const userData = {
          username: username,
          email: email,
        };

        set(ref(database, `clients/${userId}`), userData)
          .then(() => {
            console.log("User data inserted successfully!");
            // You can add navigation logic or other actions here after successful signup
          })
          .catch((error) => {
            console.error("Error inserting user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
