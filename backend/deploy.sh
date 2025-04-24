#!/bin/bash

echo "Starting Sentinal AI Backend deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Set up environment variables
if [ ! -f .env ]; then
  echo "Creating .env file from .env.example..."
  cp .env.example .env
  echo "Please update the .env file with your actual credentials."
  exit 1
fi

# Set up database
echo "Setting up database..."
npm run setup-db

# Build the project (if needed)
# echo "Building project..."
# npm run build

echo "Deployment preparation completed!"
echo "You can now deploy the backend to Vercel or your preferred hosting provider."
