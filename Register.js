import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";
import { Link } from "react-router-dom";

/**
 * Register component that provides a form for user registration.
 * Users can input their email and password, and register through the backend API.
 */
const Register = () => {
  const [email, setEmail] = useState(""); // State to hold email input
  const [password, setPassword] = useState("");// State to hold password input
  const [error, setError] = useState(""); // State to display error messages during registration

  /**
   * Handles form submission for registration.
   * Sends email and password to the backend API to create a new user.
   * @param {Event} e - The form submission event.
   */
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Make a POST request to the backend API for user registration
    axios
      .post("http://localhost:3000/api/users/register", { email, password }) // Directly use localhost:3000
      .then(() => {
        alert("Registration successful! Please log in.");
      })
      .catch((err) => {
        console.error(err);
        setError("Registration failed. Please try again.");
      });
  };

  return (
      <div className="register-container">

        <form onSubmit={handleRegister} className="register-form">
          <h2>Register</h2>

          <label>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
          </label>
          <button type="submit">Register</button>

          <div className="login-option"
               style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
            <p> Already registered?</p>
            <Link to="/login">Login here</Link>
          </div>
        </form>

      </div>
  );
};
export default Register;
