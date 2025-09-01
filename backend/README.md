# LawLink India - Backend API

A comprehensive backend API for LawLink India, a lawyer finder and legal chatbot application.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Lawyer Management**: CRUD operations for lawyer profiles with advanced search and filtering
- **Review System**: Rating and review system for lawyers
- **Legal Chatbot**: AI-powered legal information assistant
- **Real-time Communication**: Socket.io integration for live chat and video calls

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **Real-time**: Socket.io
- **AI Integration**: OpenAI GPT API
- **Communication**: Twilio (for SMS/calls)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- OpenAI API key (optional, for enhanced chatbot)

## Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
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

# Twilio Configuration (for SMS and calls)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

4. Start the development server:
```bash
npm run dev
```

5. For production:
```bash
npm start
```

## Database Seeding

To populate the database with sample data:

```bash
node seedData.js
```

This will create:
- 6 sample users (4 lawyers, 2 regular users)
- 4 lawyer profiles with complete information
- Sample reviews and ratings

## API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password
- `POST /forgot-password` - Forgot password (placeholder)

### Lawyers (`/api/lawyers`)

- `GET /` - Get all lawyers with search and filters
- `GET /:id` - Get lawyer by ID
- `POST /` - Create lawyer profile (lawyers only)
- `PUT /:id` - Update lawyer profile
- `GET /profile/me` - Get lawyer's own profile
- `GET /search/text` - Text-based lawyer search
- `GET /specializations/list` - Get available specializations
- `GET /languages/list` - Get available languages

### Chatbot (`/api/chatbot`)

- `GET /legal-info/:topic` - Get legal information by topic
- `POST /chat` - Chat with legal AI
- `GET /suggested-topics` - Get suggested legal topics
- `POST /lawyer-recommendations` - Get lawyer recommendations

### Reviews (`/api/reviews`)

- `GET /lawyer/:lawyerId` - Get reviews for a lawyer
- `POST /` - Create a review
- `PUT /:reviewId` - Update a review
- `DELETE /:reviewId` - Delete a review
- `GET /user/me` - Get user's reviews
- `GET /lawyer/:lawyerId/stats` - Get review statistics

## Search and Filtering

The lawyer search supports multiple filters:

- **Location**: City and state
- **Specialization**: Legal practice areas
- **Language**: Languages spoken
- **Experience**: Minimum years of experience
- **Consultation Mode**: Call, Text, or Video Chat
- **Rating**: Minimum rating threshold
- **Fee**: Maximum consultation fee
- **Text Search**: Full-text search across profiles

## Authentication & Authorization

- **JWT Tokens**: 7-day expiration
- **Role-based Access**: User, Lawyer, Admin
- **Protected Routes**: Middleware-based protection
- **Password Hashing**: bcrypt with salt rounds

## Real-time Features

- **Socket.io Integration**: For live chat and notifications
- **Room-based Communication**: Private consultation rooms
- **Event Handling**: Connection, disconnection, and room management

## Error Handling

- **Global Error Middleware**: Centralized error handling
- **Validation**: Input validation and sanitization
- **HTTP Status Codes**: Proper REST API status codes
- **Error Messages**: User-friendly error messages

## Security Features

- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Request body validation
- **SQL Injection Protection**: Mongoose ODM protection
- **Rate Limiting**: Basic rate limiting (can be enhanced)

## File Structure

```
backend/
├── models/          # Database models
├── routes/          # API route handlers
├── middleware/      # Custom middleware
├── config/          # Configuration files
├── server.js        # Main server file
├── seedData.js      # Database seeding
└── package.json     # Dependencies and scripts
```

## Development

### Adding New Routes

1. Create a new route file in `routes/`
2. Import and use in `server.js`
3. Follow the existing pattern for consistency

### Adding New Models

1. Create a new model file in `models/`
2. Define schema with proper validation
3. Add indexes for performance
4. Include methods if needed

### Environment Variables

- Use `.env` for local development
- Never commit sensitive data
- Document all required variables

## Testing

The API can be tested using:

- **Postman**: For manual API testing
- **Thunder Client**: VS Code extension
- **cURL**: Command line testing
- **Frontend Integration**: React app testing

## Deployment

### Production Considerations

- Set `NODE_ENV=production`
- Use strong JWT secrets
- Enable HTTPS
- Set up proper CORS origins
- Configure MongoDB connection pooling
- Set up logging and monitoring

### Environment Variables

Ensure all production environment variables are properly set:
- Database connection strings
- API keys
- JWT secrets
- CORS origins

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Write clear documentation
5. Test thoroughly before submitting

## License

This project is part of LawLink India and follows the project's licensing terms.

## Support

For issues and questions:
- Check the API documentation
- Review error logs
- Test with sample data
- Consult the frontend integration
