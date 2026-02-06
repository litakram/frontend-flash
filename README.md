# Flash AI Maturity Audit - Complete Project Guide

A comprehensive AI maturity assessment platform that evaluates organizations across 6 key dimensions: **Strategy**, **Data**, **Technologies**, **Governance & Ethics**, **Culture & People**, and **Infrastructure**.

The application generates intelligent, AI-driven maturity reports using Google Gemini API with multi-language support (English, French, Arabic).

---

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Complete Project Structure](#complete-project-structure)
- [Quick Start Guide](#quick-start-guide)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [How Components Work Together](#how-components-work-together)
- [API Reference](#api-reference)
- [Development Workflow](#development-workflow)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)
- [Tech Stack & Dependencies](#tech-stack--dependencies)

---

## 🎯 Project Overview

**Flash AI Maturity Audit** is a full-stack application designed to:
- Guide organizations through an interactive 2-axis audit questionnaire
- Collect company and user information
- Generate AI-powered maturity reports tailored to each organization
- Provide actionable roadmaps and recommendations
- Support multiple languages with proper RTL rendering

### Key Stats
- **6 Audit Axes** (Strategy, Data, Technologies, Governance, Culture, Infrastructure)
- **12 Questions** (2 per axis)
- **3 Languages** with full translations (EN, FR, AR)
- **AI-Powered Reports** using Google Gemini 2.5 Flash model
- **Fully Responsive** design for all devices

---

## 📂 Complete Project Structure

```
flash/
├── 📄 README.md                    # This file - Complete project guide
├── 📄 package.json                 # Frontend dependencies & scripts
├── 📄 tsconfig.json                # TypeScript compiler options
├── 📄 tsconfig.app.json            # App-specific TypeScript config
├── 📄 tsconfig.node.json           # Node.js TypeScript config
├── 📄 vite.config.ts               # Vite build configuration
├── 📄 eslint.config.js             # ESLint linting rules
├── 📄 index.html                   # HTML entry point
├── 📄 .env                         # Environment variables (not in git)
├── 📄 .gitignore                   # Git ignore rules
├── 📄 SETUP.bat                    # Windows setup script
├── 📄 SETUP.sh                     # Unix/Mac setup script
│
├── 📁 src/                         # Frontend source code (React + TypeScript)
│   ├── 📄 main.tsx                 # React app entry point
│   ├── 📄 App.tsx                  # Root component & landing page
│   ├── 📄 i18n.ts                  # i18n configuration & translations
│   ├── 📄 index.css                # Global styles & Tailwind directives
│   │
│   ├── 📁 components/              # React components
│   │   ├── 📄 AuditForm.tsx        # Main audit survey component
│   │   │                           # - Manages form state & validation
│   │   │                           # - Handles question progression
│   │   │                           # - Collects personal info
│   │   │                           # - Submits to backend
│   │   ├── 📄 LanguageSwitcher.tsx # Language selection component
│   │   │                           # - Switch between EN/FR/AR
│   │   │                           # - Updates i18n config
│   │   └── 📄 ReportDisplay.tsx    # Results & report visualization
│   │                               # - Displays AI-generated report
│   │                               # - Shows charts & metrics
│   │                               # - Print/export functionality
│   │
│   └── 📁 data/                    # Static audit data
│       └── 📄 data.json            # Audit questions & options
│                                   # - 12 questions × 3 languages
│                                   # - Answer options & scoring
│                                   # - Axis classification
│
├── 🖥️ server/                       # Backend source code (Node.js + Express)
│   ├── 📄 index.js                 # Express server entry point
│   │                               # - Initialize Express app
│   │                               # - Configure CORS & middleware
│   │                               # - Mount routes
│   │                               # - Start HTTP server
│   ├── 📄 package.json             # Backend dependencies
│   ├── 📄 README.md                # Detailed backend documentation
│   ├── 📄 .env                     # Environment variables (not in git)
│   ├── 📄 .env.example             # Environment template
│   │
│   ├── 📁 routes/                  # API route handlers
│   │   └── 📄 audit.js             # POST /api/audit/submit endpoint
│   │                               # - Validate audit data
│   │                               # - Call Gemini service
│   │                               # - Format response
│   │
│   └── 📁 services/                # Business logic layer
│       ├── 📄 gemini.js            # Gemini API integration
│       │                           # - Initialize Gemini client
│       │                           # - Build multilingual prompts
│       │                           # - Call API & parse responses
│       │                           # - Handle errors
│       ├── 📄 reportFormatter.js   # Report data formatting
│       │                           # - Parse Gemini JSON response
│       │                           # - Validate report structure
│       │                           # - Format for frontend
│       └── 📄 companySizeLabels.js # Company size labels mapping
│                                   # - Map size codes to labels
│
├── 🎨 assets/                      # Static assets
│   └── 📁 images/                  # Image files
│       ├── background-img.png      # Landing page background
│       └── crafters-sign.png       # Decorative logo/sign
│
└── 📁 node_modules/               # Installed packages (npm)
```

### Key Directories Explained

#### **src/** - Frontend Application
The React/TypeScript frontend that users interact with:
- **components/** - Reusable React components
- **data/** - Audit survey questions and configuration
- **i18n.ts** - Multi-language support setup

#### **server/** - Backend API
Node.js/Express backend handling:
- **routes/** - HTTP endpoint handlers
- **services/** - Business logic (Gemini API, data formatting)

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** 7+ (comes with Node.js)
- **Google Gemini API Key** ([Get free key](https://aistudio.google.com/app/apikey))

### Option 1: Automated Setup (Windows)
```bash
# Run the setup script
SETUP.bat
```

### Option 2: Automated Setup (macOS/Linux)
```bash
# Run the setup script
chmod +x SETUP.sh
./SETUP.sh
```

### Option 3: Manual Setup

#### Step 1: Install Frontend Dependencies
```bash
# From project root
npm install
```

#### Step 2: Install Backend Dependencies
```bash
# Navigate to server directory
cd server
npm install

# Go back to project root
cd ..
```

#### Step 3: Configure Environment Variables

**Frontend** - Create `.env` in project root:
```env
VITE_API_URL=http://localhost:5000
```

**Backend** - Create `server/.env`:
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

> **To get Gemini API Key:**
> 1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
> 2. Click "Create API Key"
> 3. Copy the key and paste in `server/.env`

#### Step 4: Start Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

Open `http://localhost:5173` in your browser and start an audit!

---

## 🎨 Frontend Architecture

### Directory: `src/`

#### `main.tsx` - Application Entry Point
```typescript
// Initializes React root and renders App component
// Mounts to DOM element with id="root"
```

#### `App.tsx` - Root Component & Landing Page
```typescript
// Purpose: Main application component
// Features:
// - Landing page with call-to-action
// - Switches between landing and audit form
// - Background image & styling
// - Language switcher integration
// - Crafters logo animations

// State:
// - started: bool - track if user clicked "Start Audit"
```

#### `i18n.ts` - Internationalization Configuration
```typescript
// Purpose: Multi-language support (EN/FR/AR)
// Contains:
// - EN translations (navigation, buttons, labels, questions)
// - FR translations (French)
// - AR translations (Arabic with RTL support)
// - i18n initialization & React binding

// Used by:
// - All components via useTranslation() hook
// - Language switcher component
```

#### `index.css` - Global Styles
```css
/* Tailwind CSS directives and custom animations */
/* Float animation for decorative images */
```

### `src/components/` - React Components

#### **AuditForm.tsx** - Main Survey Component
**Purpose:** Handle the complete audit questionnaire workflow

**Features:**
- Progressive form with multiple steps
- 12 questions (2 per axis × 6 axes)
- Personal information collection (name, company, sector, size, email, phone)
- Real-time progress tracking
- Answer validation
- API submission to backend
- Loading state & error handling
- Language-aware (EN/FR/AR)

**Flow:**
1. Display personal info form
2. Loop through 12 audit questions
3. Collect Likert-scale answers (1-5)
4. POST data to `/api/audit/submit`
5. Display report on success

#### **LanguageSwitcher.tsx** - Language Selection
**Purpose:** Switch between supported languages

**Features:**
- Dropdown or button selector (EN/FR/AR)
- Updates i18n language setting
- Persistence (optional localStorage)
- RTL support for Arabic
- Flag icons for visual recognition

#### **ReportDisplay.tsx** - Results Visualization
**Purpose:** Display AI-generated maturity report

**Shows:**
- Executive summary
- Overall maturity score (1-5)
- Strengths & weaknesses per axis
- 6-axis breakdown with scores
- Action roadmaps (6-month, 12-month)
- Recommendations
- Print/export options

### `src/data/` - Static Configuration

#### **data.json** - Audit Questions & Framework
```json
{
  "axes": [...],           // 6 axes definitions
  "questions": [...]       // 12 questions × 3 languages
  "options": [...]         // Answer options
  "companySizes": [...]    // Company size categories
  "sectors": [...]         // Industry sectors
}
```

---

## 🖥️ Backend Architecture

### Directory: `server/`

#### **index.js** - Server Entry Point
```javascript
// Purpose: Initialize and start Express server
// Does:
// 1. Load .env variables
// 2. Create Express app
// 3. Configure CORS middleware
// 4. Add JSON parser middleware
// 5. Mount audit routes
// 6. Add health check endpoint
// 7. Listen on PORT (default 5000)

// Key endpoints:
// GET  /health        - Server status
// POST /api/audit/submit - Submit audit & get report
```

### `server/routes/` - API Endpoints

#### **audit.js** - Audit Submission Handler
```javascript
// POST /api/audit/submit
// 
// Request:
// {
//   answers: { q1: 3, q2: 5, ... },        // Question answers (1-5)
//   personal: {                            // User info
//     fullName: "John Doe",
//     companyName: "Tech Corp",
//     sector: "Technology",
//     size: "s3",
//     email: "john@example.com",
//     phone: "+1234567890"
//   },
//   questions: [...],                      // Full question definitions
//   language: "en"                         // Report language
// }
//
// Response on success:
// {
//   success: true,
//   report: {                              // AI-generated report
//     executiveSummary: "...",
//     overallScore: 4.2,
//     strengths: [...],
//     weaknesses: [...],
//     axes: [
//       { id: 1, title: "STRATEGY", score: 4, forces: [...], faiblesses: [...] },
//       ...
//     ],
//     roadmaps: {
//       sixMonths: [...],
//       twelveMonths: [...]
//     },
//     recommendations: [...],
//     generatedAt: "2024-02-05T10:00:00Z"
//   }
// }
```

### `server/services/` - Business Logic

#### **gemini.js** - Gemini API Integration
```javascript
// Purpose: Call Google Gemini API to generate maturity reports

// Main function: generateReport(auditData)
// 
// Process:
// 1. Initialize Gemini client with API key
// 2. Build multilingual prompt based on language
// 3. Include:
//    - Audit answers with axis mapping
//    - Company context
//    - 6-axis framework definition
//    - Required report JSON format
// 4. Call gemini-2.5-flash model
// 5. Parse response as JSON
// 6. Return formatted report

// Supported languages:
// - English: Default English prompts
// - French: French prompts with French translations
// - Arabic: Arabic prompts for Arab-specific context

// Report JSON structure:
// {
//   resume_executif: string,           // Executive summary
//   niveau_maturite: string,           // Maturity level
//   axes: Array<{                      // 6 axes with scores
//     id: number,
//     titre: string,
//     score: number,
//     forces: string[],                // Strengths
//     faiblesses: string[]             // Weaknesses
//   }>,
//   analyse_globale: string,          // Global analysis
//   feuille_de_route: {               // Roadmap
//     actions_prioritaires: string[], // Priority actions
//     conclusion: string
//   }
// }
```

#### **reportFormatter.js** - Response Processing
```javascript
// Purpose: Parse and format Gemini responses

// Functions:
// - parseReportResponse(text)     // Parse JSON from Gemini response
// - formatReportResponse(report)  // Ensure report structure correctness
// - validateReportStructure()     // Check required fields

// Handles:
// - Extract JSON from potentially malformed responses
// - Validate required fields
// - Set defaults for missing values
// - Convert to uniform format for frontend
```

#### **companySizeLabels.js** - Lookup Table
```javascript
// Maps company size codes to readable labels
// Example:
// s1 -> "1-50 employees"
// s2 -> "51-200 employees"
// s3 -> "201-500 employees"
// s4 -> "501-1000 employees"
// s5 -> "1000+ employees"
```

---

## 🔄 How Components Work Together

### Complete User Journey

```
1. USER LANDS ON SITE
   └─> App.tsx renders landing page
       └─> Shows call-to-action
           └─> User clicks "Start Audit"

2. AUDIT BEGINS
   └─> AuditForm.tsx mounts
       └─> LanguageSwitcher available
           └─> User can change language
               └─> i18n updates (en/fr/ar)

3. PERSONAL INFO COLLECTION
   └─> AuditForm renders personal info form
       └─> Collects:
           ├─> Full Name
           ├─> Company Name
           ├─> Company Sector
           ├─> Company Size
           ├─> Email
           └─> Phone

4. AUDIT QUESTIONS (12 questions, 2 per axis)
   └─> AuditForm loops through questions
       └─> Questions from src/data/data.json
           └─> Translated via i18n
               └─> User rates 1-5

5. FORM SUBMISSION
   └─> AuditForm POST to backend
       └─> URL: http://localhost:5000/api/audit/submit
           └─> Sends:
               ├─> answers: { q1: 3, q2: 5, ... }
               ├─> personal: { fullName, company, ... }
               ├─> questions: [...definitions...]
               └─> language: "en"

6. BACKEND PROCESSING
   └─> server/routes/audit.js handles POST
       └─> Validates data
           └─> Calls gemini.js generateReport()
               └─> Creates multilingual prompt
                   └─> Calls Google Gemini API
                       └─> Gets JSON report
                           └─> reportFormatter.js formats response
                               └─> Returns to frontend

7. REPORT DISPLAY
   └─> ReportDisplay.tsx renders report
       └─> Shows:
           ├─> Executive summary
           ├─> Overall score
           ├─> Axis-by-axis breakdown
           ├─> Strengths & weaknesses
           ├─> Roadmaps & recommendations
           └─> Print/export options

8. USER ACTIONS
   └─> Print/download report
   └─> New audit (back to step 1)
```

### Data Flow Diagram

```
Frontend                    Backend                 External
────────────────────────────────────────────────────────────
AuditForm.tsx         audit.js (POST /api/audit/submit)
     │                     │
     ├─> answers      ├─> Validate
     ├─> personal     ├─> Extract language
     ├─> questions    │
     └─> language     ├─> Call gemini.js
                      │       │
                      │       ├─> Build prompt
                      │       ├─> Include audit data
                      │       └─> Call Gemini API ────────> Google Gemini API
                      │               │                    (gemini-2.5-flash)
                      │               └─> Parse JSON
                      │
                      ├─> reportFormatter.js
                      │   ├─> Parse response
                      │   ├─> Validate structure
                      │   └─> Format fields
                      │
                      └─> JSON response
                          │
ReportDisplay.tsx <───────┘
     │
     ├─> Display summary
     ├─> Show scores
     ├─> List strengths
     ├─> List weaknesses
     ├─> Show roadmaps
     └─> Enable print
```

---

## 📡 API Reference

### Base URL
- **Development:** `http://localhost:5000`
- **Production:** (Set via `VITE_API_URL` environment variable)

### Endpoints

#### 1. Health Check
```
GET /health

Response (200):
{
  "status": "ok",
  "message": "Server is running"
}
```

#### 2. Submit Audit & Generate Report
```
POST /api/audit/submit
Content-Type: application/json

Request Body:
{
  "answers": {
    "q1": 3,
    "q2": 5,
    "q3": 2,
    ...
    "q12": 4
  },
  "personal": {
    "fullName": "John Doe",
    "companyName": "Tech Corp Inc",
    "sector": "Technology",
    "size": "s3",
    "email": "john.doe@techcorp.com",
    "phone": "+1 (555) 123-4567"
  },
  "questions": [
    {
      "id": "q1",
      "axis": "strategy",
      "text": {
        "en": "Question text...",
        "fr": "Texte de la question...",
        "ar": "نص السؤال..."
      },
      "options": [...]
    },
    ...
  ],
  "language": "en"
}

Response (200):
{
  "success": true,
  "report": {
    "executiveSummary": "Company X demonstrates a solid foundation...",
    "overallScore": 4.2,
    "maturityLevel": "Advanced",
    "axes": [
      {
        "id": 1,
        "title": "STRATEGY",
        "score": 4.5,
        "strengths": [
          "Clear AI strategy aligned with business goals",
          "Executive sponsorship and governance structure"
        ],
        "weaknesses": [
          "Limited budget allocation",
          "Skill gaps in emerging technologies"
        ]
      },
      ...
    ],
    "roadmaps": {
      "sixMonths": [
        "Establish AI governance committee...",
        "Develop data management framework...",
        "Implement X..."
      ],
      "twelveMonths": [
        "Build AI CoE (Center of Excellence)...",
        "Deploy ML models in production...",
        "..."
      ]
    },
    "recommendations": [
      {
        "priority": "High",
        "action": "Implementation action...",
        "impact": "Expected business impact...",
        "timeline": "3-6 months"
      },
      ...
    ],
    "generatedAt": "2024-02-05T14:30:00Z"
  }
}

Response (400 - Bad Request):
{
  "success": false,
  "error": "Missing required fields: answers, personal, questions"
}

Response (500 - Server Error):
{
  "success": false,
  "error": "Failed to generate report: [details]"
}
```

### Error Handling

The API validates:
- ✅ Required fields present (answers, personal, questions)
- ✅ Personal info contains email and fullName
- ✅ Answers are numeric (1-5)
- ✅ Gemini API call succeeds
- ✅ Response is valid JSON

---

## 🛠️ Development Workflow

### Commands Reference

#### Frontend Commands
```bash
# Root directory

# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run ESLint
npm run lint

# Run specific backend service in watch mode
npm run dev:server
```

#### Backend Commands
```bash
# From server/ directory

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

#### Combined Development

**Method 1: Two Terminal Windows**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd server && npm run dev
```

**Method 2: Parallel (from root)**
```bash
# Install concurrently (optional)
npm install -D concurrently

# Add to root package.json scripts:
# "dev:all": "concurrently \"npm run dev\" \"npm run dev:server\""

npm run dev:all
```

### Project Standards

#### TypeScript
- **Strict mode** enabled in tsconfig.json
- All React components should be `.tsx` files
- Type all props and state

#### React/Components
- **Functional components** with hooks
- **React 19** with latest features
- **Tailwind CSS** for styling
- **i18next** for translations

#### Styling
- Use **Tailwind CSS** utility classes
- Global styles in `src/index.css`
- Dark theme by default
- Glassmorphism effects

#### Internationalization
- Add all text to `src/i18n.ts`
- Support EN, FR, AR languages
- Use `useTranslation()` hook in components
- Test RTL rendering for Arabic

---

## 🚀 Deployment Guide

### Frontend Deployment

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# VITE_API_URL=https://your-api-domain.com
```

#### Option 2: Netlify
```bash
# Connect GitHub repo directly or use CLI
npm run build

# Deploy dist/ folder to Netlify
# Set environment: VITE_API_URL=https://your-api-domain.com
```

#### Option 3: Traditional Hosting
```bash
# Build
npm run build

# Upload dist/ folder to:
# - AWS S3 + CloudFront
# - Google Cloud Storage
# - Firebase Hosting
# - Any static file server
```

### Backend Deployment

#### Option 1: Railway
```bash
# Connect GitHub repo
# Set environment variables:
# - GEMINI_API_KEY=your_key
# - NODE_ENV=production
# - PORT=8080 (Railway default)

# Auto-deploys on push
```

#### Option 2: Heroku
```bash
# Install Heroku CLI
npm i -g heroku

# Login
heroku login

# Create app
heroku create app-name

# Set config
heroku config:set GEMINI_API_KEY=your_key

# Deploy
git push heroku main
```

#### Option 3: DigitalOcean App Platform
```bash
# Connect GitHub repo
# Configure app.yaml:
services:
  - name: flash-server
    github:
      repo: your-username/flash
      branch: main
    build_command: npm install
    run_command: node server/index.js
    envs:
      - key: GEMINI_API_KEY
        value: ${GEMINI_API_KEY}
```

### Production Environment Variables

**Frontend (.env or CI/CD):**
```env
VITE_API_URL=https://api.yourdomain.com
VITE_ENV=production
```

**Backend (.env or platform settings):**
```env
GEMINI_API_KEY=your_production_key
PORT=5000
NODE_ENV=production
```

### Pre-deployment Checklist
- [ ] Test build locally: `npm run build`
- [ ] Run linter: `npm run lint`
- [ ] Test API endpoints with production data
- [ ] Verify Gemini API key works
- [ ] Set all environment variables
- [ ] Configure CORS for production domain
- [ ] Test full user flow in staging
- [ ] Check mobile responsiveness
- [ ] Verify all 3 languages work
- [ ] Monitor first 24 hours for errors

---

## 🔍 Detailed Component Reference

### AuditForm.tsx Structure
```tsx
// State:
type AuditFormState = {
  step: 'personal' | 'questions' | 'loading' | 'complete'
  currentQuestion: number
  personal: PersonalInfo
  answers: Record<string, number>
  loading: boolean
  error: string | null
  report: Report | null
}

// Props:
interface AuditFormProps {
  onBack: () => void
}

// Key Functions:
- handlePersonalInfoSubmit()     // Validate & save personal info
- handleAnswerChange()           // Update answer for current question
- handleNextQuestion()           // Move to next question
- handlePreviousQuestion()       // Go back to previous question
- handleSubmit()                 // POST audit data to API
- handleNewAudit()               // Reset form for new audit
```

### ReportDisplay.tsx Structure
```tsx
// Props:
interface ReportDisplayProps {
  report: Report
  personalInfo: PersonalInfo
  onNewAudit: () => void
}

// Displays:
- Executive summary
- Overall maturity score (visual)
- 6-axis comparison chart
- Strengths & weaknesses per axis
- 6-month & 12-month roadmaps
- Recommendations with priority
- Print/download buttons
```

### Data Structure: Audit Question
```typescript
interface Question {
  id: string                    // "q1", "q2", etc.
  axis: 'strategy' | 'data' | 'technologies' | 'governance' | 'culture' | 'infrastructure'
  text: {
    en: string
    fr: string
    ar: string
  }
  options: Array<{
    value: 1 | 2 | 3 | 4 | 5
    label: {
      en: string
      fr: string
      ar: string
    }
  }>
}
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Frontend Won't Start
```bash
# Error: EADDRINUSE: address already in use :::5173
# Solution: Kill process on port or use different port
netstat -ano | findstr :5173    # Windows
lsof -i :5173                   # Mac/Linux
kill PID                        # Kill process

# Error: Cannot find module 'react'
npm install
npm install --save-dev @types/react
```

#### Backend Won't Start
```bash
# Error: Cannot find module '@google/generative-ai'
cd server
npm install

# Error: EADDRINUSE: address already in use :::5000
netstat -ano | findstr :5000
kill PID

# Error: GEMINI_API_KEY is undefined
# Check server/.env exists and has GEMINI_API_KEY

# Error: dotenv module not found
npm install dotenv
```

#### Frontend Can't Reach Backend
```bash
# Issue: 404 or CORS error
# Solution 1: Check backend is running
# Terminal command:
curl http://localhost:5000/health

# Solution 2: Verify VITE_API_URL
# Check .env has correct URL
VITE_API_URL=http://localhost:5000  # development

# Solution 3: Restart both servers
# Kill both processes and restart
npm run dev              # Terminal 1
cd server && npm run dev # Terminal 2
```

#### Gemini API Errors

```bash
# Error: 401 Unauthorized
# Issue: Invalid or missing API key
# Solution: Get new key from https://aistudio.google.com/app/apikey

# Error: 429 Too Many Requests
# Issue: Rate limit exceeded
# Solution: Wait 60 seconds, upgrade plan, or use different API key

# Error: 403 Forbidden
# Issue: API not enabled or quota exceeded
# Solution: Check Google Cloud Console, enable Generative AI API

# Error: Connection refused
# Issue: Google API unreachable
# Solution: Check internet connection, try VPN if blocked
```

#### Language Not Switching
```bash
# Problem: Language button doesn't work
# Check:
1. LanguageSwitcher component mounted
2. useTranslation() hook working
3. i18n is configured correctly
4. Browser console for errors

# Debug:
localStorage.getItem('i18nextLng')  // Check stored language
```

#### Report Not Displaying
```bash
# Problem: Blank report after submission
# Check:
1. Network tab - POST request status (200?)
2. Backend logs for API errors
3. Gemini API response formatted correctly
4. ReportDisplay component props received

# Debug in browser console:
console.log('Report:', report)
```

### Performance Optimization

```javascript
// Lazy load ReportDisplay component
const ReportDisplay = lazy(() => import('./components/ReportDisplay'))

// Memoize expensive components
const AuditForm = memo(AuditFormComponent)

// Code splitting per route if added in future
```

---

## 📦 Tech Stack & Dependencies

### Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.0 | UI library |
| react-dom | 19.2.0 | React DOM rendering |
| i18next | 25.8.3 | Internationalization |
| react-i18next | 16.5.4 | React i18n integration |

### Frontend Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| typescript | 5.9.3 | Type safety |
| vite | 7.2.4 | Build tool |
| @vitejs/plugin-react | 5.1.1 | Vite React plugin |
| tailwindcss | 4.1.18 | CSS framework |
| eslint | 9.39.1 | Code linting |
| typescript-eslint | 8.46.4 | TypeScript linting |

### Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | 4.18.2+ | Web framework |
| cors | 2.8.5+ | CORS middleware |
| dotenv | 16.3.1+ | Environment variables |
| @google/generative-ai | 0.3.1+ | Gemini API SDK |

### System Requirements

- **Node.js:** 16.0.0 or higher
- **npm:** 7.0.0 or higher
- **Browser:** Modern browser with ES6+ support
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

---

## 📞 Getting Help

### Resources

- **Gemini API Docs:** https://ai.google.dev/
- **React Documentation:** https://react.dev/
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Express.js:** https://expressjs.com/
- **Vite Guide:** https://vitejs.dev/guide/

### Support Steps

1. **Check logs:**
   ```bash
   # Frontend errors
   Browser console (F12)
   
   # Backend errors
   Terminal output
   ```

2. **Verify setup:**
   ```bash
   node --version      # Should be 16+
   npm --version       # Should be 7+
   ```

3. **Test API:**
   ```bash
   curl http://localhost:5000/health
   ```

4. **Review documentation:**
   - This README
   - `server/README.md`
   - Component code comments

---

## 📄 License

MIT License - Free to use and modify

---

## 🏆 Project Stats

- **Languages Supported:** 3 (EN, FR, AR)
- **Questions:** 12 across 6 axes
- **Components:** 3 main React components
- **API Endpoints:** 2 (health, audit/submit)
- **Services:** 3 (Gemini, formatter, labels)
- **Lines of Code:** ~2000+ (Frontend + Backend)
- **Development Time:** Optimized for rapid deployment
- **Deployment Options:** 10+ hosting platforms supported

---

## 🎓 Learning Resources

This project demonstrates:
- ✅ React 19 with TypeScript
- ✅ Multi-language application (i18n)
- ✅ RESTful API design
- ✅ AI API integration
- ✅ Form state management
- ✅ Responsive design
- ✅ Error handling & validation
- ✅ Environment configuration
- ✅ Full-stack development
- ✅ Production-ready code

---

**Built with ❤️ for AI maturity assessment | Questions? Check the troubleshooting section above**
