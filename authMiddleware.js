/**
 * @file authMiddleware.js
 * @description Middleware to authenticate requests using JSON Web Tokens (JWT). Verifies the provided token, 
 * validates the user's existence in the database, and attaches user details to the request object.
 * @module authMiddleware
 * @requires jsonwebtoken
 * @requires ../config/db
 * @requires dotenv/config (for environment variables like JWT_SECRET)
 * @author Alex and Solomon
 */

const jwt = require('jsonwebtoken');
const { connectDB, sql } = require('../config/db');

/**
 * Middleware function to authenticate requests.
 * 
 * @function authMiddleware
 * @param {Object} req - The request object, including headers containing the authorization token.
 * @param {Object} res - The response object used to send back error messages if authentication fails.
 * @param {Function} next - Callback to pass control to the next middleware or route handler.
 * 
 * @returns {void}
 * @throws {Error} If the token is invalid, expired, or the user does not exist in the database.
 */
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token
  console.log("[INFO]: Authorization header received:", req.header('Authorization'));
  console.log("[INFO]: Extracted token:", token);

  if (!token) {
    console.warn("[WARNING]: No token provided.");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log("[INFO]: Decoded token payload:", decoded);

    if (!decoded.email) {
      console.error("[ERROR]: Token payload does not contain an email.");
      return res.status(400).json({ message: "Invalid token payload." });
    }

    req.user = { email: decoded.email }; // Attach email to req.user
    console.log("[INFO]: Authenticated user email:", req.user.email);

    // OPTIONAL: Validate the email exists in the database
    const pool = await connectDB();
    const result = await pool.request()
      .input('email', sql.NVarChar, req.user.email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length === 0) {
      console.error("[ERROR]: User does not exist in the database.");
      return res.status(401).json({ message: "User not found." });
    }

    console.log("[INFO]: User exists in the database:", result.recordset[0]);
    next(); // Proceed to the next middleware
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error("[ERROR]: Token expired:", error.message);
      return res.status(401).json({ message: "Token expired." });
    } else {
      console.error("[ERROR]: Invalid token:", error.message);
      return res.status(400).json({ message: "Invalid token." });
    }
  }
};

module.exports = authMiddleware;
