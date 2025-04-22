#!/bin/bash

echo "Starting simplified build process..."

# Install dependencies with legacy peer deps flag
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Install TypeScript and React types explicitly
echo "Installing TypeScript and React types explicitly..."
npm install --save-dev typescript@5.3.3 @types/react@18.2.42 @types/react-dom@18.2.17 --legacy-peer-deps

# Create a temporary .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
  echo "Creating temporary .env.local file..."
  echo "NEXT_PUBLIC_API_URL=https://sentinal-ai-backend.vercel.app" > .env.local
fi

# Run the build
echo "Running Next.js build..."
NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS="--max_old_space_size=4096" npm run build

echo "Build process completed."
