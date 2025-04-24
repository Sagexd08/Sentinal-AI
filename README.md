# Sentinal AI Platform

Sentinal AI is a comprehensive content moderation and security analysis platform that helps protect your digital assets from threats.

## Project Structure

This repository contains both the frontend and backend components of the Sentinal AI platform:

- `vigilant-sentinel/` - Frontend application built with React, Vite, and TypeScript
- `backend/` - Backend API built with Express, Node.js, and Supabase

## Features

- Content analysis and threat detection
- User authentication and profile management
- Analytics and reporting
- Agent-based architecture for extensibility
- Responsive and modern UI

## Getting Started

### Prerequisites

- Node.js (v20.17.0 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sentinal-ai.git
cd sentinal-ai

# Install frontend dependencies
cd vigilant-sentinel
npm install --legacy-peer-deps
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

### Running the Development Environment

```bash
# Start the backend server
cd backend
npm run dev
cd ..

# Start the frontend development server
cd vigilant-sentinel
npm run dev
```

## Deployment

### Frontend Deployment (Vercel)

1. Fork this repository to your GitHub account
2. Create a new project in Vercel and import your forked repository
3. Set the root directory to `vigilant-sentinel`
4. Configure the following environment variables:
   - `VITE_API_URL`: URL of your backend API
5. Deploy the project

### Backend Deployment (Vercel)

1. Create a new project in Vercel
2. Set the root directory to `backend`
3. Configure the environment variables as specified in the backend README
4. Deploy the project

## Documentation

- [Frontend Documentation](./vigilant-sentinel/README.md)
- [Backend Documentation](./backend/README.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
