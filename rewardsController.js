/**
 * @file rewardsController.js
 * @description Handles operations related to rewards, including fetching user points, 
 * available rewards, and redeeming rewards with database interaction.
 * @author Alex and Solomon
 */

const { connectDB, sql } = require('../config/db');

/**
 * Fetches the total points for the authenticated user.
 * 
 * @param {Object} req - The request object containing the authenticated user's information.
 * @param {Object} res - The response object to send back the user's total points or an error message.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue fetching the user's points from the database.
 */
const getRewards = async (req, res) => {
  const userEmail = req.user.email; // Fetch email from authenticated user

  try {
    const pool = await connectDB();

    const result = await pool
      .request()
      .input('email', sql.NVarChar, userEmail)
      .query('SELECT totalPoints AS points FROM Users WHERE email = @email');

    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(result.recordset[0]); // Return points
  } catch (error) {
    console.error('Error fetching rewards:', error.message);
    res.status(500).json({ message: 'Failed to fetch rewards.' });
  }
};

/**
 * Fetches all available rewards from the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the list of available rewards or an error message.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue fetching available rewards from the database.
 */
const getGifts = async (req, res) => {
  try {
    const pool = await connectDB();

    const result = await pool.request().query('SELECT * FROM Rewards WHERE available = 1');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No rewards available.' });
    }

    res.status(200).json(result.recordset); // Return available rewards
  } catch (error) {
    console.error('Error fetching gifts:', error.message);
    res.status(500).json({ message: 'Failed to fetch gifts.' });
  }
};

/**
 * Redeems a reward for the authenticated user by deducting points and recording the reward.
 * 
 * @param {Object} req - The request object containing the authenticated user's information and reward ID.
 * @param {Object} res - The response object to send back the redemption result or an error message.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue redeeming the reward or updating the database.
 */
const redeemReward = async (req, res) => {
  const userEmail = req.user.email;
  const rewardId = req.params.id;

  try {
    const pool = await connectDB();

    // Fetch user's total points
    const userResult = await pool
      .request()
      .input('email', sql.NVarChar, userEmail)
      .query('SELECT totalPoints FROM Users WHERE email = @email');

    if (!userResult.recordset[0]) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userPoints = userResult.recordset[0].totalPoints;

    // Fetch reward details
    const rewardResult = await pool
      .request()
      .input('rewardId', sql.Int, rewardId)
      .query('SELECT * FROM Rewards WHERE id = @rewardId AND available = 1');

    if (!rewardResult.recordset[0]) {
      return res.status(404).json({ message: 'Reward not found.' });
    }

    const reward = rewardResult.recordset[0];

    if (userPoints < reward.pointsRequired) {
      return res.status(400).json({ message: 'Insufficient points for this reward.' });
    }

    // Deduct points from user
    await pool
      .request()
      .input('email', sql.NVarChar, userEmail)
      .input('points', sql.Int, reward.pointsRequired)
      .query('UPDATE Users SET totalPoints = totalPoints - @points WHERE email = @email');

    // Add to UserRewards table
    await pool
      .request()
      .input('user_email', sql.NVarChar, userEmail)
      .input('reward_id', sql.Int, reward.id)
      .query('INSERT INTO UserRewards (user_email, reward_id) VALUES (@user_email, @reward_id)');

    res.status(200).json({ message: 'Reward redeemed successfully.' });
  } catch (error) {
    console.error('Error redeeming reward:', error.message);
    res.status(500).json({ message: 'Failed to redeem reward.' });
  }
};

module.exports = {
  getRewards,
  getGifts,
  redeemReward,
};
