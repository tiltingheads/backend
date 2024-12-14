const Breed = require('../models/Breed');

// Add a new breed
const addBreed = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the breed already exists
    const existingBreed = await Breed.findOne({ name });
    if (existingBreed) {
      return res.status(400).json({ message: 'Breed already exists' });
    }

    const breed = new Breed({ name });
    await breed.save();

    res.status(201).json({ message: 'Breed added successfully', breed });
  } catch (error) {
    console.error('Error adding breed:', error);
    res.status(500).json({ message: 'Error adding breed', error });
  }
};

// Get all breeds
const getBreeds = async (req, res) => {
  try {
    const breeds = await Breed.find().sort({ name: 1 }); // Sort alphabetically
    res.json(breeds);
  } catch (error) {
    console.error('Error fetching breeds:', error);
    res.status(500).json({ message: 'Error fetching breeds', error });
  }
};

module.exports = {
  addBreed,
  getBreeds,
};
