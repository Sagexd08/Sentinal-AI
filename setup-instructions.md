# Setup Instructions for Sentinal AI

## Fix Environment Issues

1. **Update Node.js**:
   - Download and install Node.js v20.17.0 or higher from [https://nodejs.org/](https://nodejs.org/)
   - After installation, restart your terminal/command prompt

2. **Install pnpm** (if you want to use pnpm):
   ```
   npm install -g pnpm
   ```

   Or alternatively, you can use npm instead by modifying the package.json scripts.

## Easy Installation and Setup

### Option 1: Using the Installation Scripts (Recommended)

1. Run the installation script:
   ```
   install.bat
   ```
   This will install all dependencies with the correct flags.

2. Create the environment files:

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

3. Start the application:
   ```
   start-dev.bat
   ```
   This will start both the frontend and backend servers.

### Option 2: Manual Installation

1. Install frontend dependencies:
   ```
   npm install --legacy-peer-deps
   ```

2. Install backend dependencies:
   ```
   cd server
   npm install --legacy-peer-deps
   cd ..
   ```

3. Create the environment files as shown in Option 1.

4. Start both servers:
   ```
   npm run dev:all
   ```

   Or start them separately:
   ```
   # Frontend (in one terminal)
   npm run dev

   # Backend (in another terminal)
   npm run dev:server
   ```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:3001.

## Testing the Connection

1. Open your browser and navigate to `http://localhost:3000`
2. The frontend should be able to communicate with the backend API at `http://localhost:3001`
