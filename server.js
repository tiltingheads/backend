const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const petProfileRoutes = require('./routes/petProfileRoutes');



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

// Use routes
// app.use(
//     '/', 
//     (req, res) => {
//         res.send('Welcome to Pet Profile API');
//     }
// )
app.use('/api', petProfileRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
