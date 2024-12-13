/**
 * @file wasteRoutes.js
 * @description Defines routes for managing waste entries, including adding and fetching waste entries
 * for authenticated users. These routes use middleware for authentication and interact with 
 * controller methods.
 * @author Alex and Solomon
 */

const express = require('express');
const { getWasteEntries, addWasteEntry } = require('../controllers/wasteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route POST /waste
 * @description Adds a waste entry for the authenticated user.
 * @middleware authMiddleware - Ensures the user is authenticated before allowing access.
 * @controller addWasteEntry - Handles the logic for adding a waste entry and updating user points.
 */
router.post('/waste', authMiddleware, addWasteEntry);

/**
 * @route GET /waste
 * @description Fetches all waste entries for the authenticated user.
 * @middleware authMiddleware - Ensures the user is authenticated before allowing access.
 * @controller getWasteEntries - Handles the logic for retrieving waste entries from the database.
 */
router.get('/waste', authMiddleware, getWasteEntries);

module.exports = router;
``
