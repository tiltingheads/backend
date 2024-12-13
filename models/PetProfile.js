const mongoose = require('mongoose');

// Owner Schema
const ownerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pets: [
    {
      petName: {
        type: String,
        required: true,
      },
      allergies: String,
      breed: String,
      dob: String,
      weight: Number,
      gender: String,
      temperament: String,
      medicalHistory: String,
      activities: String,
      photo: String,
    },
  ],
});

// Create model
const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
