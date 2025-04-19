// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000
    });

    res.json({ message: 'Login successful', username: user.username });
  } catch (err) {
    console.error('LOGIN ERROR:', err); // 🔥 See what failed
    res.status(500).json({ message: 'Something went wrong on the server.' });
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// routes/auth.js
router.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ loggedIn: true, username: decoded.username });
  } catch (err) {
    res.status(401).json({ loggedIn: false });
  }
});

// POST /api/users - Create a new admin user
router.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.error('USER CREATE ERROR:', err);
    res.status(500).json({ message: 'Server error creating user' });
  }
});

const authenticateToken = require('../middleware/auth'); // ✅ Make sure this is imported

// List all admin users (protected)
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // Only return usernames
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ message: 'Server error fetching users.' });
  }
});


module.exports = router; // ✅ this line is CRUCIAL
