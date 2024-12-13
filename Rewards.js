/**
 * Rewards Component
 *
 * This component displays the user's available rewards and their total points.
 * Users can redeem rewards if they have sufficient points.
 * The component fetches user points and available rewards from the server.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../styles/Rewards.css";

/**
 * Rewards component
 *
 * @returns {JSX.Element} The rendered rewards component.
 */
const Rewards = () => {
  /**
   * State to store user points.
   * @type {[number|null, Function]}
   */
  const [userPoints, setUserPoints] = useState(null);
  /**
   * State to store the list of available rewards.
   * @type {[Array<Object>, Function]}
   */
  const [availableRewards, setAvailableRewards] = useState([]);
  /**
   * State to store error messages.
   * @type {[string|null, Function]}
   */
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate
  /**
   * Fetches rewards data, including user points and available rewards.
   * If the user is not authenticated, an error message is displayed.
   */
  const fetchRewardsData = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Please log in to view your rewards.");
      return;
    }

    // Fetch user points
    axios
      .get("http://localhost:3000/api/rewards/points", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserPoints(response.data.points);
      })
      .catch((err) => {
        console.error("Error fetching user points:", err.response || err.message);
        setError("Please log in to view your rewards.");
      });
    // Fetch available rewards
    axios
        .get("http://localhost:3000/api/rewards/gifts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAvailableRewards(response.data);
        })
        .catch((err) => {
          console.error("Error fetching rewards:", err.response || err.message);
          setError("Failed to fetch available rewards.");
        });

  };
      useEffect(() => {
        fetchRewardsData();
      },
      []);
  /**
   * Handles the redemption of a reward.
   *
   * @param {string} rewardId - The unique identifier of the reward.
   * @param {number} rewardCost - The points required to redeem the reward.
   */
  const handleRedeem = (rewardId, rewardCost) => {
    if (userPoints >= rewardCost) {
      // Deduct points locally without causing re-render issues
      setUserPoints(userPoints - rewardCost);

      // Navigate to Shipping.js
      navigate('/shipping');
    } else {
      // Show error without altering rewards list
      setError('Insufficient points to redeem this reward.');
    }

  };

  return (
    <div className="rewards-container">
      <div className="rewards-box">
        <h1>Your Rewards</h1>
        {error && <p className="error-message">{error}</p>}
        <p>Total Points: {userPoints !== null ? userPoints : "Loading..."}</p>
        <h2>Available Rewards:</h2>
        <ul>
          {availableRewards.length > 0 ? (
            availableRewards.map((reward) => (
              <li key={reward.id}>
                <h3>{reward.name}</h3>
                <p>Points Required: {reward.pointsRequired}</p>
                <button
                  onClick={() => handleRedeem(reward.id, reward.pointsRequired)}
                  disabled={userPoints < reward.pointsRequired}
                >
                  {userPoints < reward.pointsRequired ? "Insufficient Points" : "Redeem"}
                </button>
              </li>
            ))
          ) : (
            <p>No rewards available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Rewards;
