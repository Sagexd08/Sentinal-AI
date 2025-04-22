#!/bin/bash

# Script to run Docker Compose commands for development

# Function to display help message
show_help() {
  echo "Usage: ./docker-dev.sh [COMMAND]"
  echo ""
  echo "Commands:"
  echo "  up        Start the development environment"
  echo "  down      Stop the development environment"
  echo "  build     Build the Docker images"
  echo "  logs      View the logs of the running containers"
  echo "  frontend  Access a shell in the frontend container"
  echo "  backend   Access a shell in the backend container"
  echo "  help      Display this help message"
  echo ""
}

# Check if a command was provided
if [ $# -eq 0 ]; then
  show_help
  exit 1
fi

# Process the command
case "$1" in
  up)
    echo "Starting the development environment..."
    docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
    ;;
  down)
    echo "Stopping the development environment..."
    docker-compose down
    ;;
  build)
    echo "Building the Docker images..."
    docker-compose -f docker-compose.yml -f docker-compose.override.yml build
    ;;
  logs)
    echo "Viewing the logs of the running containers..."
    docker-compose logs -f
    ;;
  frontend)
    echo "Accessing a shell in the frontend container..."
    docker-compose exec frontend sh
    ;;
  backend)
    echo "Accessing a shell in the backend container..."
    docker-compose exec backend sh
    ;;
  help)
    show_help
    ;;
  *)
    echo "Unknown command: $1"
    show_help
    exit 1
    ;;
esac
