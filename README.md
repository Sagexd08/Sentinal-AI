# 🛡️ SentinelAI

Next-Generation AI-Powered Content Moderation & Security Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

**SentinelAI** is a revolutionary platform that harnesses the power of advanced LSTM neural networks and custom AI agents to deliver state-of-the-art content moderation and security vulnerability detection.

Built for developers, content managers, and security professionals, SentinelAI provides enterprise-grade protection for your digital assets against harmful content and emerging security threats.

🔒 **Secure** • 🚀 **Scalable** • 💡 **Intelligent** • ⚡ **Real-time**

## Key Features

- **LSTM-Powered Vulnerability Detection**: Advanced neural networks analyze code for security vulnerabilities with exceptional accuracy
- **Custom AI Agent**: Intelligent agent performs deep scans of websites for security vulnerabilities
- **Content Moderation**: Automatically detect and flag harmful content across text, images, and other media
- **Real-time Notifications**: Stay informed with WebSocket-powered real-time notifications

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, Supabase
- **AI & ML**: PyTorch, Python, scikit-learn
- **DevOps**: GitHub Actions, Vercel

## Installation & Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```
   git clone https://github.com/Sagexd08/SentinelAI.git
   cd SentinelAI
   ```

2. **Install dependencies**
   ```
   # Install all dependencies with a single command
   npm run install:all
   
   # Or install dependencies separately
   # Install frontend dependencies
   cd frontend
   npm install --legacy-peer-deps
   
   # Install backend dependencies
   cd ../backend
   npm install
   
   # Install Python dependencies
   pip install -r ai/requirements.txt
   ```

3. **Set up environment variables**
   Create `.env` files in both frontend and backend directories based on the provided examples.

4. **Start the development servers**
   ```
   # Option 1: Start both servers with a single command
   npm run dev:vscode
   
   # Option 2: Start servers separately
   # Start backend
   npm run dev:backend
   
   # Start frontend (in a new terminal)
   npm run dev:frontend
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

### Deployment to Vercel

1. **Deploy the frontend**
   ```
   # Run the frontend deployment script
   ./deploy-frontend.ps1
   
   # Or manually deploy
   cd frontend
   npm install --legacy-peer-deps
   npm run build
   npx vercel --prod
   ```

2. **Deploy the backend**
   ```
   # Run the backend deployment script
   ./deploy-backend.ps1
   
   # Or manually deploy
   cd backend
   npm install
   npx vercel --prod
   ```

3. **Access the deployed application**
   Once deployed, your application will be available at:
   - Frontend: `https://sentinelai.vercel.app`
   - Backend: `https://sentinelai-api.vercel.app`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Sohom Chatterjee
