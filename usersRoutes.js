/**
 * @file usersRoutes.js
 * @description Defines routes for user management, including user registration, login,
 * fetching all users, and retrieving data for the logged-in user. These routes use middleware
 * for authentication where necessary and interact with user controller methods.
 * @module usersRoutes
 * @requires express
 * @requires ../controllers/usersController
 * @requires ../middleware/authMiddleware
 * @author Alex and Solomon
 */

const express = require('express');
const {
  getUsers,
  registerUser,
  loginUser,
  getLoggedInUser,
} = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route POST /register
 * @description Registers a new user.
 * @controller registerUser - Handles the logic for user registration.
 */
router.post('/register', registerUser);

/**
 * @route POST /login
 * @description Logs in a user and returns a JWT token.
 * @controller loginUser - Handles the logic for user authentication and token generation.
 */
router.post('/login', loginUser);

/**
 * @route GET /
 * @description Fetches a list of all users.
 * @controller getUsers - Handles the logic for retrieving all users from the database.
 */
router.get('/', getUsers);

/**
 * @route GET /me
 * @description Fetches the data of the authenticated (logged-in) user.
 * @middleware authMiddleware - Ensures the user is authenticated before allowing access.
 * @controller getLoggedInUser - Handles the logic for retrieving the logged-in user's data.
 */
router.get('/me', authMiddleware, getLoggedInUser);

module.exports = router;
