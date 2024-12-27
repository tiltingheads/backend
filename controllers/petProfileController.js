const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner.js'); // Updated model name

// Register owner and pet profile
const registerOwner = async (req, res) => {
  // console.log('Registering owner:', req.body);
  try {
    const { username, password, email, phone } = req.body;

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new owner
    const owner = new Owner({
      username,
      password: hashedPassword,
      email,
      phone,
      pets: [], // Pets are added later
    });

    await owner.save();
    res.status(201).json({ message: 'Owner registered successfully', ownerId: owner._id });
  } catch (error) {
    console.error('Error registering owner:', error);
    res.status(500).json({ message: 'Error registering owner', error });
  }
};

// Login function
const loginOwner = async (req, res) => {
  // console.log('Logging in owner:', req.body);
  try {
    const { username, password } = req.body;

    const owner = await Owner.findOne({ username });
    if (!owner) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: owner._id, username: owner.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get owner profile with pets
const getOwnerProfile = async (req, res) => {
  console.log('Fetching owner profile:', req.user);
  try {
    

    let profile;

    // Admins fetch all profiles or their own
    if (req.user.role === 'admin') {
      profile = await Admin.findById(req.user.id);
      if (!profile) {
        return res.status(404).json({ message: 'Admin profile not found' });
      }
    } else {
      // Regular owners fetch their own profile
      profile = await Owner.findById(req.user.id);
      if (!profile) {
        return res.status(404).json({ message: 'Owner not found' });
      }
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

// Update owner or pet profiles
const updateOwnerProfile = async (req, res) => {
  try {
    const updates = req.body;

    // If updating pets, ensure the pets field is an array
    if (updates.pets && !Array.isArray(updates.pets)) {
      return res.status(400).json({ message: 'Pets should be an array' });
    }

    const owner = await Owner.findByIdAndUpdate(req.user.id, updates, { new: true });
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.json({ message: 'Profile updated successfully', owner });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// Delete owner and all associated pets
const deleteOwnerProfile = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.user.id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.json({ message: 'Owner and all associated pets deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Error deleting profile', error });
  }
};

// Add a new pet to an existing owner
const addPet = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { pet } = req.body;

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    owner.pets.push(pet); // Add pet to the owner's pets array
    await owner.save();
    res.json({ message: 'Pet added successfully', owner });
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ message: 'Error adding pet', error });
  }
};

// Remove a pet from an existing owner
const removePet = async (req, res) => {
  try {
    const { petId } = req.body;

    const owner = await Owner.findById(req.user.id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    owner.pets = owner.pets.filter((pet) => pet._id.toString() !== petId);
    await owner.save();
    res.json({ message: 'Pet removed successfully', owner });
  } catch (error) {
    console.error('Error removing pet:', error);
    res.status(500).json({ message: 'Error removing pet', error });
  }
};
const updatePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const updates = req.body;

    const owner = await Owner.findOneAndUpdate(
      { 'pets._id': petId },
      { $set: { 'pets.$': updates } },
      { new: true }
    );

    if (!owner) return res.status(404).json({ message: 'Pet not found' });

    res.json({ message: 'Pet updated successfully', pet: updates });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ message: 'Error updating pet', error });
  }
};
const addProfilePet = async (req, res) => {
  try {
    const { pet } = req.body;

    // Fetch owner using the authenticated user ID
    const owner = await Owner.findById(req.user.id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    // Add the new pet to the owner's pets array
    owner.pets.push(pet);
    await owner.save();

    // Respond with the newly added pet
    const newlyAddedPet = owner.pets[owner.pets.length - 1];
    res.status(201).json({ message: 'Pet added successfully', pet: newlyAddedPet });
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ message: 'Error adding pet', error });
  }
};


module.exports = {
  registerOwner,
  loginOwner,
  getOwnerProfile,
  updateOwnerProfile,
  deleteOwnerProfile,
  addPet,
  updatePet,
  removePet,
  addProfilePet,
};
