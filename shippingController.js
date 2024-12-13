/**
 * @file shippingController.js
 * @description Handles operations related to shipping information, including adding a new shipping address
 * and retrieving shipping addresses for a specific user. Interacts with the database to perform these operations.
 * @module shippingController
 * @requires ../config/db
 * @author Alex and Solomon
 */

const { connectDB, sql } = require('../config/db');

/**
 * Adds a new shipping address for a user.
 *
 * @function addShipping
 * @param {Object} req - The request object containing shipping details in the body.
 * @param {number} req.body.user_id - The ID of the user to whom the shipping address belongs.
 * @param {string} req.body.first_name - The first name associated with the shipping address.
 * @param {string} req.body.last_name - The last name associated with the shipping address.
 * @param {string} req.body.address - The street address for shipping.
 * @param {string} req.body.city - The city for shipping.
 * @param {string} req.body.state - The state for shipping.
 * @param {string} req.body.zip - The ZIP code for shipping.
 * @param {Object} res - The response object to send back a success or error message.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue adding the shipping address to the database.
 */
exports.addShipping = async (req, res) => {
    const { user_id, first_name, last_name, address, city, state, zip } = req.body;
    try {
        const pool = await connectDB();
        await pool
            .request()
            .input('user_id', sql.Int, user_id)
            .input('first_name', sql.NVarChar, first_name)
            .input('last_name', sql.NVarChar, last_name)
            .input('address', sql.NVarChar, address)
            .input('city', sql.NVarChar, city)
            .input('state', sql.NVarChar, state)
            .input('zip', sql.NVarChar, zip)
            .query(
                'INSERT INTO Shipping (user_id, first_name, last_name, address, city, state, zip) VALUES (@user_id, @first_name, @last_name, @address, @city, @state, @zip)'
            );
        res.status(201).json({ message: 'Shipping address added successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Retrieves shipping addresses for a specific user.
 *
 * @function getShipping
 * @param {Object} req - The request object containing the user ID in the parameters.
 * @param {number} req.params.user_id - The ID of the user whose shipping addresses are to be retrieved.
 * @param {Object} res - The response object to send back the retrieved shipping addresses or an error message.
 * 
 * @returns {void}
 * @throws {Error} If there is an issue retrieving the shipping addresses from the database.
 */
exports.getShipping = async (req, res) => {
    const { user_id } = req.params;
    try {
        const pool = await connectDB();
        const result = await pool
            .request()
            .input('user_id', sql.Int, user_id)
            .query('SELECT * FROM Shipping WHERE user_id = @user_id');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
