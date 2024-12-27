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
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Role can be 'user' or 'admin'
    default: 'user',  // By default, new accounts are regular users
  },
  pets: [
    {
      petName: {
        type: String,
      },
      allergies: String,
      breed: String,
      dob: String,
      weight: Number,
      gender: String,
      temperament: String,
      medicalHistory: [String],
      activities: String,
      photo: String,
      images: [String],
    },
  ],
});

// Create model
const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
