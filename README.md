# 🏛️ LawLink India

A modern, comprehensive web application for finding lawyers and getting legal assistance in India. Built with React, Node.js, and MongoDB.

## ✨ Features

### 🔍 Lawyer & Advocate Finder
- **Advanced Search & Filtering**: Search by location, specialization, experience, language, and more
- **Comprehensive Profiles**: View detailed lawyer information including qualifications, specializations, and reviews
- **Rating System**: Read authentic client reviews and ratings
- **Multiple Consultation Modes**: Call, Text, or Video Chat options
- **Location-based Search**: Find lawyers in your city or state

### 🤖 AI Legal Chatbot
- **Indian Law Knowledge**: Trained on Indian Constitution, IPC, CrPC, RTI, and other important laws
- **Instant Legal Information**: Get answers to common legal questions
- **Lawyer Recommendations**: AI suggests appropriate lawyer types based on your query
- **Disclaimer System**: Clear disclaimers that information is not legal advice

### 🎨 Modern Design & UX
- **Indian Theme**: Beautiful design with Indian cultural elements
- **Responsive Design**: Works perfectly on all devices
- **Material-UI**: Modern, accessible interface components
- **Intuitive Navigation**: Easy-to-use interface for all users

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for components
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time features
- **OpenAI API** for chatbot intelligence
- **Twilio** for communication (SMS/calls)

### Database
- **MongoDB** for data storage
- **Mongoose** for data modeling
- **Text indexing** for search functionality

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- OpenAI API key (optional, for enhanced chatbot)
- Twilio credentials (optional, for SMS/calls)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd lawlink-india
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 4. Database Setup
```bash
cd backend

# Seed the database with sample data
node seedData.js
```

## 🌐 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/lawlink-india

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Frontend URL
FRONTEND_URL=http://localhost:3000

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Twilio Configuration
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

## 🗄️ Database Schema

### Users
- Basic user information (name, email, phone, role)
- Role-based access control (user, lawyer, admin)
- Profile pictures and verification status

### Lawyers
- Professional details (qualifications, specializations, experience)
- Location and availability information
- Consultation fees and modes
- Rating and review statistics

### Reviews
- Client ratings and comments
- Consultation type tracking
- Anonymous review options

## 🔐 Authentication

- **JWT-based authentication**
- **Role-based access control**
- **Secure password hashing** with bcrypt
- **Token expiration** and refresh handling

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Lawyers
- `GET /api/lawyers` - Search and filter lawyers
- `GET /api/lawyers/:id` - Get lawyer details
- `POST /api/lawyers` - Create lawyer profile
- `PUT /api/lawyers/:id` - Update lawyer profile

### Chatbot
- `POST /api/chatbot/chat` - Chat with AI
- `GET /api/chatbot/suggested-topics` - Get legal topics
- `POST /api/chatbot/lawyer-recommendations` - Get recommendations

### Reviews
- `GET /api/reviews/lawyer/:id` - Get lawyer reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review

## 🎯 Demo Accounts

### Lawyer Account
- **Email**: rajesh.kumar@lawlink.com
- **Password**: password123

### User Account
- **Email**: rahul.singh@example.com
- **Password**: password123

## 🚀 Running the Application

### Development Mode
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm start
```

### Production Mode
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm install -g serve
serve -s build
```

## 📁 Project Structure

```
lawlink-india/
├── backend/                 # Node.js backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   ├── server.js           # Main server file
│   └── seedData.js         # Database seeding
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── README.md               # Project documentation
```

## 🔍 Search & Filtering

The application supports comprehensive search and filtering:

- **Location**: City and state-based search
- **Specialization**: Legal practice areas
- **Experience**: Years of practice
- **Language**: Languages spoken
- **Consultation Mode**: Call, Text, or Video Chat
- **Rating**: Minimum rating threshold
- **Fee**: Maximum consultation fee
- **Text Search**: Full-text search across profiles

## 🤖 AI Chatbot Features

- **Legal Information**: Access to Indian legal knowledge
- **Smart Responses**: Context-aware legal assistance
- **Lawyer Recommendations**: AI suggests appropriate legal help
- **Disclaimer System**: Clear legal disclaimers
- **Fallback Responses**: Works even without OpenAI API

## 📱 Responsive Design

- **Mobile-first approach**
- **Progressive Web App features**
- **Touch-friendly interface**
- **Optimized for all screen sizes**

## 🔒 Security Features

- **JWT token authentication**
- **Password hashing with bcrypt**
- **CORS configuration**
- **Input validation and sanitization**
- **Rate limiting (can be enhanced)**
- **Secure API endpoints**

## 🚀 Deployment

### Backend Deployment
- Set `NODE_ENV=production`
- Configure MongoDB connection
- Set up environment variables
- Use PM2 or similar for process management

### Frontend Deployment
- Build the production bundle
- Deploy to CDN or hosting service
- Configure environment variables
- Set up proper CORS origins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the API endpoints
- Test with sample data
- Open an issue on GitHub

## 🔮 Future Enhancements

- **Video calling integration**
- **Document sharing and management**
- **Payment gateway integration**
- **Advanced analytics dashboard**
- **Mobile app development**
- **Multi-language support**
- **Advanced AI features**

## 🎉 Acknowledgments

- Built with modern web technologies
- Designed for the Indian legal market
- Focused on accessibility and user experience
- Scalable architecture for future growth

---

**LawLink India** - Connecting you with the best legal professionals across India! ⚖️🇮🇳
