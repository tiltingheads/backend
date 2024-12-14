const mongoose = require('mongoose');

const BreedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Breed', BreedSchema);
