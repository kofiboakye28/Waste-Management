import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useUser } from "../components/UserContext";

/**
 * Login Component
 *
 * This component renders a login form for users to enter their email and password.
 * Upon successful login, the user's authentication token is stored in localStorage,
 * and the user is redirected to the main application page.
 *
 * @component
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();
    /**
     * Handles the login form submission.
     * Sends a POST request to the login endpoint with email and password.
     * Stores the received token in localStorage and redirects on success.
     *
     * @param {Event} e - The form submission event.
     */
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/login", { email, password }) // API endpoint for login
      .then((response) => {
        const token = response.data.token; // Extract token from response
        console.log("Token received:", token);
        localStorage.setItem("authToken", token); // Store token in localStorage
        localStorage.setItem("email", email); // Store email in localStorage
        setUser({ email }); // Update user context globally

        // Trigger a "storage" event manually to update other components
        window.dispatchEvent(new Event("storage"));

        alert("Login successful!");
        navigate("/waste"); // Redirect to homepage or rewards page
      })
      .catch((error) => {
        console.error("Error logging in:", error.response?.data || error.message);
        setError("Failed to log in. Please check your credentials.");
      });
  };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Login</button>
                {error && <div className="error-message">{error}</div>}

                <div className="register-option" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <p>New to the platform?</p>
                    <a href="/register">Register here</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
