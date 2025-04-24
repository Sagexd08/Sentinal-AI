#!/bin/bash

echo "Starting custom build process..."

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  echo "Creating .env.local file..."
  echo "NEXT_PUBLIC_API_URL=https://sentinal-ai-backend.vercel.app" > .env.local
fi

# Install dependencies with legacy peer deps flag
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Install server dependencies
echo "Installing server dependencies..."
cd server && npm install && cd ..

# Run Next.js build with increased memory
echo "Running Next.js build..."
NODE_OPTIONS="--max-old-space-size=4096" npx next build

echo "Build process completed."
