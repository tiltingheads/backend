const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const petProfileRoutes = require('./routes/petProfileRoutes');
const breedRoutes = require('./routes/breedRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express app
const app = express();
app.use(express.json());

 app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


app.use('/api', petProfileRoutes);
app.use('/api/breeds', breedRoutes);
app.use('/api/admin', adminRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
