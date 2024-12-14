const express = require('express');
const router = express.Router();
const { addBreed, getBreeds } = require('../controllers/breedController');

// Add a new breed
router.post('/add', addBreed);

// Get all breeds
router.get('/', getBreeds);

module.exports = router;
