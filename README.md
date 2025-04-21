# 🛡️ SentinelAI

Next-Generation AI-Powered Content Moderation & Security Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

**SentinelAI** is a revolutionary platform that harnesses the power of advanced LSTM neural networks and custom AI agents to deliver state-of-the-art content moderation and security vulnerability detection.

Built for developers, content managers, and security professionals, SentinelAI provides enterprise-grade protection for your digital assets against harmful content and emerging security threats.

🔒 **Secure** • 🚀 **Scalable** • 💡 **Intelligent** • ⚡ **Real-time**

## Key Features

- **AI Agent Hub**: Orchestrated AI agents for intelligent content analysis
- **Content Moderation**: Automatically detect and flag harmful content across text, images, and other media
- **Adaptive Policies**: Self-improving moderation rules based on feedback
- **Real-time Analysis**: Immediate content assessment with detailed risk scoring
- **Supabase Integration**: Secure and scalable data storage

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, Supabase
- **AI & ML**: LangChain.js, Google Gemini API
- **DevOps**: GitHub Actions, Vercel

## Installation & Setup

### Prerequisites

- Node.js 20.17.0 or higher
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/sentinal-ai.git
   cd sentinal-ai
   ```

2. **Install dependencies**
   ```
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Set up environment variables**

   **Frontend (.env.local)**:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   **Backend (server/.env)**:
   ```
   PORT=3001
   NODE_ENV=development
   SUPABASE_URL=https://fkuzdgnidoiksdrulcav.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.…By7oKv0Am0
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.…tB0A6dOY
   JWT_SECRET=GY8TqtKsQdAh87vyRXxwt/KKeggVTAMg5Se7NpmL0A3X8A3NZIqUy1V5VtoKKSj4I/UIXAkmogZqJJ6cYG46rg==
   GEMINI_API_KEY=AIzaSyD6F_MBHqrf-TDdzzbuOt7ZYI6ROP-dL5s
   ```

4. **Start the development servers**
   ```
   # Run both frontend and backend concurrently
   npm run dev:all

   # Or run them separately
   # Frontend
   npm run dev

   # Backend
   npm run dev:server
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Demo page: http://localhost:3000/demo

### Deployment

#### Backend Deployment

1. **Build the Docker image**:
   ```
   cd server
   docker build -t sentinal-ai-backend .
   ```

2. **Run the container**:
   ```
   docker run -p 3001:3001 --env-file .env sentinal-ai-backend
   ```

   Or use docker-compose:
   ```
   cd server
   docker-compose up
   ```

#### Frontend Deployment

Deploy to Vercel:
```
vercel
```

#### Access the deployed application
Once deployed, your application will be available at the URLs provided by your deployment platform.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


