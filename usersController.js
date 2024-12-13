/**
 * @file usersController.js
 * @description Handles user-related operations, including fetching all users, registering a new user,
 * logging in, and fetching data for the logged-in user. Interacts with the database for these operations.
 * @module usersController
 * @requires ../config/db
 * @requires bcrypt
 * @requires jsonwebtoken
 * @requires dotenv/config (for environment variables like JWT_SECRET)
 * @author Alex and Solomon
 */

const { connectDB, sql } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Fetches all users from the database.
 * 
 * @function getUsers
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the list of users or an error message.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue fetching users from the database.
 */
const getUsers = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Users');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};

/**
 * Registers a new user by hashing their password and saving their information to the database.
 * Generates a JWT token for the user upon successful registration.
 * 
 * @function registerUser
 * @param {Object} req - The request object containing user registration details in the body.
 * @param {string} req.body.email - The email of the new user.
 * @param {string} req.body.password - The plain-text password of the new user.
 * @param {Object} res - The response object to send back a JWT token or an error message.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue registering the user or interacting with the database.
 */
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await connectDB();

    // Check if user already exists
    const existingUser = await pool
      .request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and save user to database
    const passwordHash = await bcrypt.hash(password, 10);

    await pool.request()
      .input('email', sql.NVarChar, email)
      .input('passwordHash', sql.NVarChar, passwordHash)
      .query('INSERT INTO Users (email, passwordHash) VALUES (@email, @passwordHash)');

    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Failed to register user' });
  }
};

/**
 * Logs in a user by verifying their credentials and generating a JWT token.
 * 
 * @function loginUser
 * @param {Object} req - The request object containing login details in the body.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The plain-text password of the user.
 * @param {Object} res - The response object to send back a JWT token or an error message.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue logging in the user or interacting with the database.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.recordset[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Failed to log in' });
  }
};

/**
 * Retrieves the logged-in user's data, including their email and total points.
 * 
 * @function getLoggedInUser
 * @param {Object} req - The request object containing the authenticated user's information.
 * @param {Object} res - The response object to send back the user's data or an error message.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue retrieving the user's data from the database.
 */
const getLoggedInUser = async (req, res) => {
  const userEmail = req.user.email;

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input('email', sql.NVarChar, userEmail)
      .query('SELECT email, totalPoints AS points FROM Users WHERE email = @email');

    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching logged-in user:', error.message);
    res.status(500).json({ message: 'Failed to fetch user data.' });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getLoggedInUser,
};
