const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const {
  registerOwner,
  loginOwner,
  getOwnerProfile,
  updateOwnerProfile,
  deleteOwnerProfile,
  addPet,
  updatePet,
  removePet,
  addProfilePet,
} = require('../controllers/petProfileController'); // Updated controller functions

// Register owner and pets route
router.post('/register', registerOwner);

// Login route
router.post('/login', loginOwner);

// Get owner profile with pets (protected)
router.get('/profile', authenticateToken, getOwnerProfile);
// Update owner profile or pets (protected)
router.put('/profile/update', authenticateToken, updateOwnerProfile);

// Delete owner profile and all associated pets (protected)
router.delete('/profile/delete', authenticateToken, deleteOwnerProfile);
// Update pet details (protected)
router.put('/profile/pet/:petId', authenticateToken, updatePet);
// Add a new pet to an existing owner (protected)
router.post('/:ownerId/pets/add', addPet);
// Remove a pet from an existing owner (protected)
router.delete('/pets/remove', authenticateToken, removePet);
router.post('/profile/pet/add', authenticateToken, addProfilePet);
module.exports = router;
