const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');  // Owner model for users and admins
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  authenticateToken  = require('../middleware/authMiddleware');

// Admin Login (POST)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Owner.findOne({ username, role: 'admin' });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
});

// View All Users (Admin Only)
router.get('/users', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const users = await Owner.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});



module.exports = router;
