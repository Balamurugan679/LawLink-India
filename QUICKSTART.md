# 🚀 Quick Start Guide - LawLink India

Get LawLink India up and running in minutes!

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud)
- **Git** (for cloning)

## ⚡ Quick Start (Recommended)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd lawlink-india
```

### 2. Run the Quick Start Script
```bash
./start.sh
```

This script will:
- Install all dependencies
- Set up the database with sample data
- Start both frontend and backend servers

## 🔧 Manual Setup

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/lawlink-india

# JWT Secret
JWT_SECRET=your-secret-key-here

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services
```

### 4. Seed the Database
```bash
cd backend
node seedData.js
```

### 5. Start the Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 Demo Accounts

### Lawyer Account
- **Email**: rajesh.kumar@lawlink.com
- **Password**: password123

### User Account
- **Email**: rahul.singh@example.com
- **Password**: password123

## 🔍 Test the Features

1. **Browse Lawyers**: Visit `/find-lawyer` to search and filter lawyers
2. **Legal Chatbot**: Visit `/ask-bot` to ask legal questions
3. **User Authentication**: Login/Register to access full features
4. **Lawyer Profiles**: Click on any lawyer to view detailed profiles

## 🛠️ Development Commands

```bash
# Start both services
npm run dev

# Start only backend
npm run backend

# Start only frontend
npm run frontend

# Build frontend for production
npm run build

# Seed database
npm run seed
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check if port 27017 is available
- Verify connection string in `.env`

### Port Conflicts
- Change ports in `.env` file
- Kill processes using ports 3000 or 5000

### Dependencies Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Database Issues
- Run `npm run seed` to reset sample data
- Check MongoDB logs for errors

## 📱 Features to Test

- ✅ **Home Page**: Beautiful landing page with Indian theme
- ✅ **Lawyer Search**: Advanced filtering and search
- ✅ **Lawyer Profiles**: Detailed information and reviews
- ✅ **Authentication**: Login/Register system
- ✅ **AI Chatbot**: Legal information assistant
- ✅ **Responsive Design**: Works on all devices

## 🚀 Next Steps

1. **Customize**: Modify colors, branding, and content
2. **Enhance**: Add more features like video calling
3. **Deploy**: Deploy to production servers
4. **Scale**: Add more lawyers and features

---

**Need Help?** Check the main README.md for detailed documentation! 📚
