const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  barCouncilNumber: {
    type: String,
    required: true,
    unique: true
  },
  qualification: {
    type: String,
    required: true
  },
  specializations: [{
    type: String,
    enum: [
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
    ]
  }],
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  languages: [{
    type: String,
    enum: [
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
    ]
  }],
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    address: String,
    pincode: String
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0
  },
  consultationModes: [{
    type: String,
    enum: ['Call', 'Text', 'Video Chat'],
    default: ['Call', 'Text']
  }],
  availability: {
    monday: {
      isAvailable: { type: Boolean, default: true },
      startTime: String,
      endTime: String
    },
    tuesday: {
      isAvailable: { type: Boolean, default: true },
      startTime: String,
      endTime: String
    },
    wednesday: {
      isAvailable: { type: Boolean, default: true },
      startTime: String,
      endTime: String
    },
    thursday: {
      isAvailable: { type: Boolean, default: true },
      startTime: String,
      endTime: String
    },
    friday: {
      isAvailable: { type: Boolean, default: true },
      startTime: String,
      endTime: String
    },
    saturday: {
      isAvailable: { type: Boolean, default: false },
      startTime: String,
      endTime: String
    },
    sunday: {
      isAvailable: { type: Boolean, default: false },
      startTime: String,
      endTime: String
    }
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  achievements: [String],
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  totalConsultations: {
    type: Number,
    default: 0
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

// Index for search functionality
lawyerSchema.index({
  'location.city': 'text',
  'location.state': 'text',
  specializations: 'text',
  languages: 'text'
});

// Method to calculate average rating
lawyerSchema.methods.updateRating = function(newRating) {
  this.rating.count += 1;
  this.rating.average = ((this.rating.average * (this.rating.count - 1)) + newRating) / this.rating.count;
  return this.save();
};

module.exports = mongoose.model('Lawyer', lawyerSchema);
