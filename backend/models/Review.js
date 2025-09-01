const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500,
    required: true
  },
  consultationType: {
    type: String,
    enum: ['Call', 'Text', 'Video Chat'],
    required: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure one review per user per lawyer
reviewSchema.index({ lawyerId: 1, userId: 1 }, { unique: true });

// Update lawyer rating when review is saved
reviewSchema.post('save', async function(doc) {
  const Lawyer = mongoose.model('Lawyer');
  const lawyer = await Lawyer.findById(doc.lawyerId);
  if (lawyer) {
    await lawyer.updateRating(doc.rating);
  }
});

// Update lawyer rating when review is updated
reviewSchema.post('findOneAndUpdate', async function(doc) {
  if (doc) {
    const Lawyer = mongoose.model('Lawyer');
    const lawyer = await Lawyer.findById(doc.lawyerId);
    if (lawyer) {
      // Recalculate average rating
      const Review = mongoose.model('Review');
      const reviews = await Review.find({ lawyerId: doc.lawyerId });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      lawyer.rating.average = totalRating / reviews.length;
      lawyer.rating.count = reviews.length;
      await lawyer.save();
    }
  }
});

module.exports = mongoose.model('Review', reviewSchema);
