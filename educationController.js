/**
 * @file educationController.js
 * @description Handles educational content-related operations, such as fetching educational resources
 * for users to learn about recycling, composting, and reducing plastic usage.
 * @module educationController
 * @requires express (used indirectly for request and response handling in route definitions)
 * @author Alex and Solomon
 */

/**
 * Fetches a predefined list of educational content.
 * 
 * @function getEducationalContent
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the educational content.
 * 
 * @returns {void}
 * @description Sends a JSON response containing a list of educational topics related to environmental sustainability.
 */
exports.getEducationalContent = (req, res) => {
    res.status(200).json({
        message: 'Education routes working!',
        content: [
            { id: 1, topic: 'Recycling Basics', description: 'Learn how to recycle effectively.' },
            { id: 2, topic: 'Composting', description: 'The benefits of composting for the environment.' },
            { id: 3, topic: 'Plastic Reduction', description: 'Tips for reducing plastic usage in daily life.' },
        ],
    });
};
