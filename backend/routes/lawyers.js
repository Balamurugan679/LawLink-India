const express = require('express');
const Lawyer = require('../models/Lawyer');
const User = require('../models/User');
const { auth, requireLawyer } = require('../middleware/auth');

const router = express.Router();

// Get all lawyers with search and filters
router.get('/', async (req, res) => {
  try {
    const {
      city,
      state,
      specialization,
      language,
      experience,
      consultationMode,
      minRating,
      maxFee,
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = { isActive: true, isVerified: true };

    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (specialization) filter.specializations = { $in: [specialization] };
    if (language) filter.languages = { $in: [language] };
    if (experience) filter.experience = { $gte: parseInt(experience) };
    if (consultationMode) filter.consultationModes = { $in: [consultationMode] };
    if (minRating) filter['rating.average'] = { $gte: parseFloat(minRating) };
    if (maxFee) filter.consultationFee = { $lte: parseInt(maxFee) };

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get lawyers with pagination
    const lawyers = await Lawyer.find(filter)
      .populate('userId', 'name email profilePicture')
      .sort({ 'rating.average': -1, experience: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Lawyer.countDocuments(filter);

    res.json({
      lawyers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalLawyers: total,
        hasNext: skip + lawyers.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get lawyer by ID
router.get('/:id', async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id)
      .populate('userId', 'name email profilePicture phone');

    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    res.json({ lawyer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create lawyer profile
router.post('/', auth, requireLawyer, async (req, res) => {
  try {
    // Check if lawyer profile already exists
    const existingLawyer = await Lawyer.findOne({ userId: req.user._id });
    if (existingLawyer) {
      return res.status(400).json({ message: 'Lawyer profile already exists' });
    }

    const lawyerData = {
      ...req.body,
      userId: req.user._id
    };

    const lawyer = new Lawyer(lawyerData);
    await lawyer.save();

    res.status(201).json({
      message: 'Lawyer profile created successfully',
      lawyer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update lawyer profile
router.put('/:id', auth, requireLawyer, async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer profile not found' });
    }

    // Ensure user can only update their own profile
    if (lawyer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (key !== 'userId' && key !== '_id') {
        lawyer[key] = updates[key];
      }
    });

    await lawyer.save();

    res.json({
      message: 'Profile updated successfully',
      lawyer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get lawyer's own profile
router.get('/profile/me', auth, requireLawyer, async (req, res) => {
  try {
    const lawyer = await Lawyer.findOne({ userId: req.user._id });
    
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer profile not found' });
    }

    res.json({ lawyer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search lawyers by text
router.get('/search/text', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const filter = {
      isActive: true,
      isVerified: true,
      $text: { $search: q }
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const lawyers = await Lawyer.find(filter)
      .populate('userId', 'name email profilePicture')
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Lawyer.countDocuments(filter);

    res.json({
      lawyers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalLawyers: total,
        hasNext: skip + lawyers.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available specializations
router.get('/specializations/list', async (req, res) => {
  try {
    const specializations = [
      'Criminal Law',
      'Civil Law',
      'Family Law',
      'Corporate Law',
      'Property Law',
      'Constitutional Law',
      'Tax Law',
      'Labor Law',
      'Intellectual Property',
      'Environmental Law',
      'Banking Law',
      'Real Estate Law'
    ];

    res.json({ specializations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available languages
router.get('/languages/list', async (req, res) => {
  try {
    const languages = [
      'English',
      'Hindi',
      'Tamil',
      'Telugu',
      'Kannada',
      'Malayalam',
      'Bengali',
      'Marathi',
      'Gujarati',
      'Punjabi',
      'Urdu',
      'Sanskrit'
    ];

    res.json({ languages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
