#!/bin/bash
# Flash AI Maturity Audit - Complete Setup Script
# This script helps you set up both frontend and backend

set -e

echo "🚀 Flash AI Maturity Audit - Setup Helper"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js 16+${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js $NODE_VERSION found${NC}"
echo ""

# Frontend Setup
echo -e "${BLUE}Setting up Frontend...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
    echo -e "${YELLOW}  Please edit .env and set VITE_API_URL if needed${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo -e "${BLUE}Installing frontend dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

# Backend Setup
echo -e "${BLUE}Setting up Backend...${NC}"
if [ ! -d "server" ]; then
    echo -e "${YELLOW}⚠️  server/ directory not found${NC}"
    exit 1
fi

cd server

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created server/.env file${NC}"
    echo -e "${YELLOW}  ⚠️  IMPORTANT: Add your GEMINI_API_KEY to server/.env${NC}"
else
    echo -e "${GREEN}✓ server/.env file already exists${NC}"
fi

echo -e "${BLUE}Installing backend dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
echo ""

cd ..

# Summary
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Get Gemini API Key:"
echo "   Visit: https://aistudio.google.com/app/apikey"
echo "   Copy your API key"
echo ""
echo "2. Configure Backend:"
echo "   Edit: server/.env"
echo "   Add: GEMINI_API_KEY=your_key_here"
echo ""
echo "3. Start the Backend (in one terminal):"
echo "   cd server"
echo "   npm run dev"
echo ""
echo "4. Start the Frontend (in another terminal):"
echo "   npm run dev"
echo ""
echo "5. Open in Browser:"
echo "   http://localhost:5173"
echo ""
echo -e "${YELLOW}For detailed setup instructions, see README.md and server/README.md${NC}"
