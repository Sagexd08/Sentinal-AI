# Sentinal AI Backend

This is the backend API for the Sentinal AI platform, a content moderation and security analysis system.

## Features

- Content analysis and threat detection
- User authentication and profile management
- Analytics and reporting
- Agent-based architecture for extensibility
- Supabase integration for database storage

## Agent System

The backend uses an agent-based architecture with the following components:

- **Agent Hub**: Coordinates between different agents in the system
- **Detection Agent**: Analyzes content for security threats
- **Database Agent**: Handles database operations
- **Policy Agent**: Manages content moderation policies

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Content

- `POST /api/content/analyze` - Analyze content for security threats
- `GET /api/content/history` - Get content analysis history
- `GET /api/content/report/:id` - Get detailed report for a specific analysis
- `POST /api/content/feedback` - Submit feedback for an analysis

### Analytics

- `GET /api/analytics/dashboard` - Get dashboard analytics data
- `GET /api/analytics/threats` - Get threat analytics data
- `GET /api/analytics/performance` - Get system performance metrics
- `GET /api/analytics/reports` - Get custom analytics reports

### Policy

- `GET /api/policy` - Get current content moderation policies
- `PUT /api/policy` - Update content moderation policies

## Getting Started

### Prerequisites

- Node.js (v20.17.0 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```
PORT=3001
NODE_ENV=development
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173
PRODUCTION_FRONTEND_URL=https://sentinal-ai.vercel.app
```

## Deployment

### Vercel Deployment

1. Fork this repository to your GitHub account
2. Create a new project in Vercel and import your forked repository
3. Set the root directory to `backend`
4. Configure the environment variables in Vercel
5. Deploy the project
