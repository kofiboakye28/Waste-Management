/**
 * @file wasteController.js
 * @description Handles waste entry-related operations for the logged-in user, 
 * including fetching and adding waste entries with database interaction.
 */

const { connectDB, sql } = require('../config/db');

/**
 * Retrieves all waste entries for the authenticated user.
 * 
 * @param {Object} req - The request object containing the authenticated user's information.
 * @param {Object} res - The response object to send back the waste entries or error messages.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue fetching waste entries from the database.
 */
const getWasteEntries = async (req, res) => {
  const userEmail = req.user?.email; // Get authenticated user's email
  console.log('Fetching waste entries for user:', userEmail);

  try {
    const pool = await connectDB();
    console.log('Database connection established for fetching waste entries.');

    // Fetch waste entries for the logged-in user
    const result = await pool
      .request()
      .input('email', sql.NVarChar, userEmail)
      .query('SELECT * FROM WasteEntries WHERE user_email = @email ORDER BY entryDate DESC');

    if (result.recordset.length === 0) {
      console.warn('No waste entries found for user:', userEmail);
      return res.status(404).json({ message: 'No waste entries found for this user.' });
    }

    console.log('Waste entries fetched successfully:', result.recordset);
    res.status(200).json(result.recordset); // Return the waste entries
  } catch (error) {
    console.error('Error fetching waste entries:', error.message);
    res.status(500).json({ message: 'Failed to fetch waste entries.' });
  }
};

/**
 * Adds a new waste entry for the authenticated user and calculates reward points.
 * 
 * @param {Object} req - The request object containing the waste details and authenticated user information.
 * @param {Object} res - The response object to send back success or error messages.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue adding the waste entry or updating points in the database.
 */
const addWasteEntry = async (req, res) => {
  console.log("Add Waste Entry Request:", req.body, req.user);

  const { wasteType, wasteAmount } = req.body; // Extract from request body
  const userEmail = req.user?.email; // Authenticated user's email from middleware

  // Predefined points for each waste type
  const wasteTypes = {
    Plastic: 1,
    Glass: 2,
    Paper: 1,
    Metal: 3,
  };

  // Validate input
  if (!wasteType || !wasteAmount || isNaN(wasteAmount)) {
    return res.status(400).json({ message: 'Valid waste type and amount are required.' });
  }

  if (!wasteTypes[wasteType]) {
    return res.status(400).json({ message: `Invalid waste type: ${wasteType}.` });
  }

  // Calculate reward points based on waste type and amount
  const pointsEarned = wasteTypes[wasteType] * parseInt(wasteAmount, 10);

  try {
    const pool = await connectDB();

    // Insert waste entry for the logged-in user
    await pool.request()
      .input('user_email', sql.NVarChar, userEmail)
      .input('waste_type', sql.NVarChar, wasteType)
      .input('waste_amount', sql.Int, parseInt(wasteAmount, 10))
      .input('points_earned', sql.Int, pointsEarned)
      .query(
        'INSERT INTO WasteEntries (user_email, waste_type, waste_amount, points_earned) VALUES (@user_email, @waste_type, @waste_amount, @points_earned)'
      );

    // Update the logged-in user's total points
    await pool.request()
      .input('email', sql.NVarChar, userEmail)
      .input('points', sql.Int, pointsEarned)
      .query('UPDATE Users SET totalPoints = totalPoints + @points WHERE email = @email');

    console.log('Waste entry added successfully and points updated for user:', userEmail);

    res.status(200).json({ message: 'Waste entry added successfully and points updated.' });
  } catch (error) {
    console.error('Error adding waste entry:', error.message);
    res.status(500).json({ message: 'Failed to add waste entry and update points.' });
  }
};

module.exports = {
  getWasteEntries,
  addWasteEntry,
};
