const express = require('express');
const Review = require('../models/Review');
const Lawyer = require('../models/Lawyer');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get reviews for a lawyer
router.get('/lawyer/:lawyerId', async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reviews = await Review.find({ lawyerId })
      .populate('userId', 'name profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments({ lawyerId });

    res.json({
      reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalReviews: total,
        hasNext: skip + reviews.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a review
router.post('/', auth, async (req, res) => {
  try {
    const { lawyerId, rating, comment, consultationType, isAnonymous } = req.body;

    // Validate required fields
    if (!lawyerId || !rating || !comment || !consultationType) {
      return res.status(400).json({ 
        message: 'lawyerId, rating, comment, and consultationType are required' 
      });
    }

    // Check if lawyer exists
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    // Check if user has already reviewed this lawyer
    const existingReview = await Review.findOne({ 
      lawyerId, 
      userId: req.user._id 
    });

    if (existingReview) {
      return res.status(400).json({ 
        message: 'You have already reviewed this lawyer' 
      });
    }

    // Create review
    const review = new Review({
      lawyerId,
      userId: req.user._id,
      rating,
      comment,
      consultationType,
      isAnonymous: isAnonymous || false
    });

    await review.save();

    // Populate user info for response
    await review.populate('userId', 'name profilePicture');

    res.status(201).json({
      message: 'Review submitted successfully',
      review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a review
router.put('/:reviewId', auth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment, consultationType, isAnonymous } = req.body;

    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Ensure user can only update their own review
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update fields
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (consultationType !== undefined) review.consultationType = consultationType;
    if (isAnonymous !== undefined) review.isAnonymous = isAnonymous;

    await review.save();

    // Populate user info for response
    await review.populate('userId', 'name profilePicture');

    res.json({
      message: 'Review updated successfully',
      review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a review
router.delete('/:reviewId', auth, async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Ensure user can only delete their own review
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Review.findByIdAndDelete(reviewId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's reviews
router.get('/user/me', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate('lawyerId', 'barCouncilNumber')
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get review statistics for a lawyer
router.get('/lawyer/:lawyerId/stats', async (req, res) => {
  try {
    const { lawyerId } = req.params;

    const stats = await Review.aggregate([
      { $match: { lawyerId: new require('mongoose').Types.ObjectId(lawyerId) } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          ratingDistribution: {
            $push: {
              rating: '$rating',
              count: 1
            }
          }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.json({
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: {
          1: 0, 2: 0, 3: 0, 4: 0, 5: 0
        }
      });
    }

    // Calculate rating distribution
    const ratingDist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats[0].ratingDistribution.forEach(item => {
      ratingDist[item.rating] = (ratingDist[item.rating] || 0) + item.count;
    });

    res.json({
      totalReviews: stats[0].totalReviews,
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      ratingDistribution: ratingDist
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Report a review (placeholder for moderation)
router.post('/:reviewId/report', auth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: 'Reason is required' });
    }

    // This would typically create a report record
    // For now, just return success message
    res.json({ 
      message: 'Review reported successfully. Our team will review it.' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
