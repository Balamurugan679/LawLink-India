#!/bin/bash

echo "🏛️  LawLink India - Quick Start Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

# Check if MongoDB is running (optional check)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB command not found. Make sure MongoDB is installed and running."
    echo "   You can download MongoDB from: https://www.mongodb.com/try/download/community"
    echo ""
fi

echo "📦 Installing dependencies..."
npm run install-all

echo ""
echo "🌱 Setting up database..."
npm run seed

echo ""
echo "🚀 Starting LawLink India..."
echo ""
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend API will be available at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Start both frontend and backend
npm run dev
