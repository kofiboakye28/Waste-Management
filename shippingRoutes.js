/**
 * @file shippingRoutes.js
 * @description Defines routes for managing shipping information, including adding a new shipping address
 * and retrieving shipping addresses for authenticated users. These routes use middleware for authentication
 * and interact with the shipping controller methods.
 * @module shippingRoutes
 * @requires express
 * @requires ../controllers/shippingController
 * @requires ../middleware/authMiddleware
 * @author Alex and Solomon
 */

const express = require('express');
const { addShipping, getShipping } = require('../controllers/shippingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route POST /api/shipping
 * @description Adds a new shipping address for the authenticated user.
 * @middleware authMiddleware - Ensures the user is authenticated before allowing access.
 * @controller addShipping - Handles the logic for adding a shipping address to the database.
 */
router.post('/', authMiddleware, addShipping);

/**
 * @route GET /api/shipping/:user_id
 * @description Retrieves shipping addresses for a specific user by their user ID.
 * @middleware authMiddleware - Ensures the user is authenticated before allowing access.
 * @controller getShipping - Handles the logic for retrieving shipping addresses from the database.
 * @param {string} user_id - The ID of the user whose shipping addresses are to be retrieved.
 */
router.get('/:user_id', authMiddleware, getShipping);

module.exports = router;
