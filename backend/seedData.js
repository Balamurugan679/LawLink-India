const mongoose = require('mongoose');
const User = require('./models/User');
const Lawyer = require('./models/Lawyer');
const Review = require('./models/Review');

// Sample data for testing
const sampleUsers = [
  {
    name: 'Adv. Rajesh Kumar',
    email: 'rajesh.kumar@lawlink.com',
    password: 'password123',
    phone: '+91-9876543210',
    role: 'lawyer',
    profilePicture: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=RK'
  },
  {
    name: 'Adv. Priya Sharma',
    email: 'priya.sharma@lawlink.com',
    password: 'password123',
    phone: '+91-9876543211',
    role: 'lawyer',
    profilePicture: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=PS'
  },
  {
    name: 'Adv. Amit Patel',
    email: 'amit.patel@lawlink.com',
    password: 'password123',
    phone: '+91-9876543212',
    role: 'lawyer',
    profilePicture: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=AP'
  },
  {
    name: 'Adv. Meera Reddy',
    email: 'meera.reddy@lawlink.com',
    password: 'password123',
    phone: '+91-9876543213',
    role: 'lawyer',
    profilePicture: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=MR'
  },
  {
    name: 'Rahul Singh',
    email: 'rahul.singh@example.com',
    password: 'password123',
    phone: '+91-9876543214',
    role: 'user',
    profilePicture: 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=RS'
  },
  {
    name: 'Anjali Desai',
    email: 'anjali.desai@example.com',
    password: 'password123',
    phone: '+91-9876543215',
    role: 'user',
    profilePicture: 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=AD'
  }
];

const sampleLawyers = [
  {
    barCouncilNumber: 'BC001',
    qualification: 'LL.B., Delhi University',
    specializations: ['Criminal Law', 'Civil Law'],
    experience: 8,
    languages: ['English', 'Hindi'],
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      address: '123 Legal Street, Andheri West',
      pincode: '400058'
    },
    consultationFee: 1500,
    consultationModes: ['Call', 'Text', 'Video Chat'],
    availability: {
      monday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      tuesday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      wednesday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      thursday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      friday: { isAvailable: true, startTime: '09:00', endTime: '18:00' },
      saturday: { isAvailable: false },
      sunday: { isAvailable: false }
    },
    bio: 'Experienced criminal lawyer with expertise in handling complex criminal cases. Specialized in criminal defense and civil litigation.',
    achievements: ['Best Criminal Lawyer Award 2022', '100+ Successful Cases'],
    education: [
      { degree: 'LL.B.', institution: 'Delhi University', year: 2015 },
      { degree: 'LL.M.', institution: 'National Law School', year: 2016 }
    ],
    isVerified: true,
    isActive: true
  },
  {
    barCouncilNumber: 'BC002',
    qualification: 'LL.B., Mumbai University',
    specializations: ['Family Law', 'Property Law'],
    experience: 12,
    languages: ['English', 'Hindi', 'Marathi'],
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      address: '456 Family Court Road, Bandra East',
      pincode: '400051'
    },
    consultationFee: 2000,
    consultationModes: ['Call', 'Video Chat'],
    availability: {
      monday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      tuesday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      wednesday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      thursday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      friday: { isAvailable: true, startTime: '10:00', endTime: '19:00' },
      saturday: { isAvailable: true, startTime: '10:00', endTime: '16:00' },
      sunday: { isAvailable: false }
    },
    bio: 'Specialized family lawyer with extensive experience in divorce, custody, and property disputes. Known for compassionate approach.',
    achievements: ['Family Law Expert', 'Mediation Specialist'],
    education: [
      { degree: 'LL.B.', institution: 'Mumbai University', year: 2011 },
      { degree: 'LL.M.', institution: 'Symbiosis Law School', year: 2012 }
    ],
    isVerified: true,
    isActive: true
  },
  {
    barCouncilNumber: 'BC003',
    qualification: 'LL.B., Gujarat University',
    specializations: ['Corporate Law', 'Intellectual Property'],
    experience: 6,
    languages: ['English', 'Hindi', 'Gujarati'],
    location: {
      city: 'Ahmedabad',
      state: 'Gujarat',
      address: '789 Corporate Plaza, Navrangpura',
      pincode: '380009'
    },
    consultationFee: 2500,
    consultationModes: ['Call', 'Text', 'Video Chat'],
    availability: {
      monday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      thursday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      friday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
      saturday: { isAvailable: false },
      sunday: { isAvailable: false }
    },
    bio: 'Corporate lawyer specializing in business law, intellectual property, and contract negotiations. Expert in startup legal matters.',
    achievements: ['Corporate Law Excellence Award', 'IP Law Specialist'],
    education: [
      { degree: 'LL.B.', institution: 'Gujarat University', year: 2017 },
      { degree: 'LL.M.', institution: 'NALSAR', year: 2018 }
    ],
    isVerified: true,
    isActive: true
  },
  {
    barCouncilNumber: 'BC004',
    qualification: 'LL.B., Osmania University',
    specializations: ['Property Law', 'Real Estate Law'],
    experience: 15,
    languages: ['English', 'Hindi', 'Telugu'],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
      address: '321 Property Lane, Banjara Hills',
      pincode: '500034'
    },
    consultationFee: 1800,
    consultationModes: ['Call', 'Text'],
    availability: {
      monday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      tuesday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      wednesday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      thursday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      friday: { isAvailable: true, startTime: '08:00', endTime: '17:00' },
      saturday: { isAvailable: true, startTime: '08:00', endTime: '14:00' },
      sunday: { isAvailable: false }
    },
    bio: 'Senior property lawyer with 15+ years of experience in real estate transactions, property disputes, and land acquisition matters.',
    achievements: ['Property Law Expert', 'Real Estate Specialist'],
    education: [
      { degree: 'LL.B.', institution: 'Osmania University', year: 2008 },
      { degree: 'LL.M.', institution: 'NLSIU', year: 2009 }
    ],
    isVerified: true,
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Lawyer.deleteMany({});
    await Review.deleteMany({});

    console.log('Existing data cleared');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`Created user: ${user.name}`);
    }

    // Create lawyers
    const createdLawyers = [];
    for (let i = 0; i < sampleLawyers.length; i++) {
      const lawyerData = {
        ...sampleLawyers[i],
        userId: createdUsers[i]._id
      };
      const lawyer = new Lawyer(lawyerData);
      await lawyer.save();
      createdLawyers.push(lawyer);
      console.log(`Created lawyer: ${lawyer.barCouncilNumber}`);
    }

    // Create some sample reviews
    const sampleReviews = [
      {
        lawyerId: createdLawyers[0]._id,
        userId: createdUsers[4]._id, // Rahul Singh
        rating: 5,
        comment: 'Excellent lawyer! Helped me win my case.',
        consultationType: 'Call',
        isAnonymous: false
      },
      {
        lawyerId: createdLawyers[1]._id,
        userId: createdUsers[5]._id, // Anjali Desai
        rating: 4,
        comment: 'Very professional and understanding.',
        consultationType: 'Video Chat',
        isAnonymous: false
      }
    ];

    for (const reviewData of sampleReviews) {
      const review = new Review(reviewData);
      await review.save();
      console.log(`Created review for lawyer: ${reviewData.lawyerId}`);
    }

    console.log('Database seeding completed successfully!');
    console.log(`Created ${createdUsers.length} users, ${createdLawyers.length} lawyers, and ${sampleReviews.length} reviews`);

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lawlink-india', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    return seedDatabase();
  })
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
}

module.exports = { seedDatabase };
