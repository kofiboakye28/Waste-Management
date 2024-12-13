/**
 * Waste Component
 *
 * This React component allows users to submit waste data, including waste type and amount.
 * On submission, it sends the data to a server endpoint and provides feedback to the user.
 */

import React, { useState } from "react";
import axios from "axios";
import "../styles/Waste.css";

/**
 * Waste component function.
 * Manages the state and logic for submitting waste data.
 * @returns {JSX.Element} The rendered component.
 */
const Waste = () => {
  const [wasteType, setWasteType] = useState("");
  const [wasteAmount, setWasteAmount] = useState("");
  const [message, setMessage] = useState("");

  /**
   * Handles waste submission.
   * Sends the waste type and amount to the server with authentication.
   */
  const handleWasteSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token
      console.log("Token being sent:", token);

      if (!token) {
        setMessage("Error: User not authenticated. Please log in.");
        return;
      }

      if (!wasteType || !wasteAmount) {
        setMessage("Please fill out all fields.");
        return;
      }

      // Hardcoded API URL
      const apiUrl = "http://localhost:3000/api/waste/waste";
      console.log("Sending POST to:", apiUrl);

      // Make a  POST request to the server with the waste data
      const response = await axios.post(
        apiUrl,
        { wasteType, wasteAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );

      // Update the message state with the server response and reset the form fields
      setMessage(response.data.message);
      setWasteType("");
      setWasteAmount("");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to add waste. Please try again.";
      setMessage(errorMsg);
      console.error("Error adding waste:", error.response || error.message);
    }
  };

  return (
    <div className="waste-container">
      <div className="waste-box">
        <h1>Welcome! Enter the amount of waste to receive points</h1>
        {message && (
          <p className={`message ${message.includes("Error") ? "error" : ""}`}>
            {message}
          </p>
        )}
        {/* Input field for waste type */}
        <div className="input-group">
          <label>Waste Type</label>
          <select
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
          >
            <option value="">Select waste type</option>
            <option value="Plastic">Plastic</option>
            <option value="Glass">Glass</option>
            <option value="Paper">Paper</option>
            <option value="Metal">Metal</option>
          </select>
        </div>
        {/* Input field for waste amount */}
        <div className="input-group">
          <label>Waste Amount (grams)</label>
          <input
            type="number"
            value={wasteAmount}
            onChange={(e) => setWasteAmount(e.target.value)}
            placeholder="Enter waste amount"
          />
        </div>
        {/* Submit button */}
        <button onClick={handleWasteSubmit}>Add Waste</button>
      </div>
    </div>
  );
};

export default Waste;
