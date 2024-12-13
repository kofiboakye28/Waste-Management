import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Ensure this file exists
import image from "../components/images/ASlogo1.png";
import { useUser } from "./UserContext";

const Navbar = () => {
  const {user, setUser} = useUser();
  const navigate = useNavigate(); // State to hold user information

  useEffect(() => {
    // Retrieve user info from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user state
    }
  }, [setUser]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Reset user state
    alert("You have been logged out.");
    navigate ("/");
  };


  return (
      <header>
        <h3>
          <Link to="/">
            <img src={image} alt="logo" style={{width: "85px", height: "85px"}}/>
          </Link>
        </h3>
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/waste">Waste</Link>
          <Link to="/rewards">Rewards</Link>
          {user && (
              <>

              </>
          )}
          <Link to="/education">Education</Link>
        </nav>

        {user ? (
            // If user is logged in, display profile
            <div className="user-profile">
              <span className="user-name">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>

            </div>
        ) : (
            <Link to="/Register">
              <span className="register-tag">Sign Up</span>
            </Link>

        )}
      </header>
  );
};

export default Navbar;
