const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: '7d'
  });
};

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or phone already exists' 
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone,
      role: role || 'user'
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User Profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({ user: req.user.getPublicProfile() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User Profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['name', 'phone', 'profilePicture'];
    
    // Only allow certain fields to be updated
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        req.user[key] = updates[key];
      }
    });

    await req.user.save();
    res.json({ 
      message: 'Profile updated successfully',
      user: req.user.getPublicProfile() 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Change Password
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isMatch = await req.user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    req.user.password = newPassword;
    await req.user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Forgot Password (placeholder)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // This would typically send a reset email
    // For now, just return a success message
    res.json({ message: 'If an account exists with this email, a reset link has been sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
