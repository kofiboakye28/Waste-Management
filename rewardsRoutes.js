/**
 * @file rewardsRoutes.js
 * @description Defines routes for managing rewards, including fetching user points,
 * retrieving available rewards, and redeeming rewards for authenticated users. 
 * These routes use middleware for authentication and interact with controller methods.
 * @author Alex and Solomon
 */

const express = require('express');
const {
  getRewards,
  getGifts,
  redeemReward, // Import the redeemReward function
} = require('../controllers/rewardsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route GET /points
 * @description Fetches the total points of the authenticated user.
 * @middleware authMiddleware - Ensures the user is authenticated before allowing access.
 * @controller getRewards - Handles the logic for retrieving the user's total points.
 */
router.get('/points', authMiddleware, getRewards);

/**
 * @route GET /gifts
 * @description Fetches all available rewards.
 * @middleware authMiddleware - Ensures the user is authenticated before allowing access.
 * @controller getGifts - Handles the logic for retrieving available rewards from the database.
 */
router.get('/gifts', authMiddleware, getGifts);

/**
 * @route POST /redeem/:id
 * @description Redeems a reward for the authenticated user based on the reward ID provided.
 * @middleware authMiddleware - Ensures the user is authenticated before allowing access.
 * @controller redeemReward - Handles the logic for redeeming the reward and updating the database.
 * @param {string} id - The ID of the reward to be redeemed.
 */
router.post('/redeem/:id', authMiddleware, redeemReward);

module.exports = router;
