const express = require('express'); // Import express
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/usersController'); // Import getUsers, addUser, updateUser, and deleteUser functions from usersController
const router = express.Router(); // Create a new router

router.get('/', getUsers);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router; // Export router
