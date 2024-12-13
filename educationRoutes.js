/**
 * @file educationRoutes.js
 * @description Defines routes for accessing educational content, including learning about recycling,
 * composting, and reducing plastic usage. These routes interact with the education controller methods.
 * @module educationRoutes
 * @requires express
 * @requires ../controllers/educationController
 * @author Alex and Solomon
 */

const express = require('express');
const { getEducationalContent } = require('../controllers/educationController');

const router = express.Router();

/**
 * @route GET /api/education
 * @description Fetches a list of educational content related to environmental sustainability.
 * @controller getEducationalContent - Handles the logic for providing predefined educational resources.
 */
router.get('/', getEducationalContent);

module.exports = router;
