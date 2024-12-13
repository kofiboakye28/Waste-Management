/**
 * @file app.js
 * @description The entry point for the backend server application. Configures middleware, sets up routes,
 * handles global errors, and starts the server. Includes database connection testing before server startup.
 * @requires express
 * @requires cors
 * @requires dotenv
 * @requires ./config/db
 * @requires ./routes/usersRoutes
 * @requires ./routes/rewardsRoutes
 * @requires ./routes/wasteRoutes
 * @requires ./routes/educationRoutes
 * @module server
 * @exports app - The Express application instance for testing purposes.
 * @author Alex and Solomon
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Import routes
const usersRoutes = require('./routes/usersRoutes');
const rewardsRoutes = require('./routes/rewardsRoutes');
const wasteRoutes = require('./routes/wasteRoutes');
const educationRoutes = require('./routes/educationRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware to parse incoming JSON requests.
 * 
 * @middleware express.json
 */
app.use(express.json());

/**
 * Cross-Origin Resource Sharing (CORS) configuration.
 * Allows requests from the specified origin with certain methods and headers.
 * 
 * @middleware cors
 */
app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

/**
 * Handles preflight OPTIONS requests for CORS.
 * Sets appropriate headers and sends a 204 No Content response.
 * 
 * @route OPTIONS /*
 */
app.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  });
  res.status(204).end();
});

/**
 * Middleware to log all incoming requests for debugging purposes.
 * Logs the HTTP method and URL of the request.
 * 
 * @middleware requestLogger
 */
app.use((req, res, next) => {
  console.log(`[Request]: ${req.method} ${req.originalUrl}`);
  next();
});

/**
 * Mount API routes for different functionalities.
 * 
 * @route /api/users - Routes for user management.
 * @route /api/rewards - Routes for reward management.
 * @route /api/waste - Routes for waste management.
 * @route /api/education - Routes for educational content.
 */
app.use('/api/users', usersRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/education', educationRoutes);

/**
 * Global error-handling middleware.
 * Captures unhandled errors and sends a JSON response with error details.
 * 
 * @middleware errorHandler
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function (not used here).
 */
app.use((err, req, res, next) => {
  console.error(`[Error]: ${err.message}`);
  res.status(500).json({ error: err.message });
});

/**
 * Starts the server after testing the database connection.
 * If the database connection fails, the server will not start.
 * 
 * @function startServer
 * @async
 */
(async () => {
  try {
    console.log('Testing database connection...');
    await connectDB();
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error.message);
    process.exit(1); // Exit the process with a failure code
  }
})();

module.exports = app; // Export the app instance for testing or further usage
