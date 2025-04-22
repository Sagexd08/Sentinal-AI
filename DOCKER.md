# Docker Setup for Sentinal AI

This document provides instructions on how to use Docker to run the Sentinal AI application.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Development Environment

To start the development environment:

```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

This will start:
- Frontend development server at http://localhost:3000
- Backend server at http://localhost:3001

The development environment includes:
- Hot reloading for both frontend and backend
- Volume mounts for code changes
- Development-specific environment variables

### Production Environment

To start the production environment:

```bash
docker-compose up
```

This will start:
- Frontend production server at http://localhost:3000
- Backend production server at http://localhost:3001

### Building the Images

To build the Docker images without starting the containers:

```bash
docker-compose build
```

### Stopping the Containers

To stop the running containers:

```bash
docker-compose down
```

## Configuration

### Environment Variables

The following environment variables can be configured:

#### Frontend
- `NODE_ENV`: Set to `development` or `production`
- `NEXT_PUBLIC_API_URL`: URL of the backend API

#### Backend
- `NODE_ENV`: Set to `development` or `production`
- `PORT`: Port on which the backend server runs

## Troubleshooting

### Common Issues

1. **Port conflicts**: If you already have services running on ports 3000 or 3001, you'll need to modify the port mappings in the docker-compose.yml file.

2. **Volume mounting issues**: If you're experiencing issues with volume mounts, try restarting Docker or running:
   ```bash
   docker-compose down -v
   docker-compose up
   ```

3. **Node modules issues**: If you're experiencing issues with node modules, try rebuilding the images:
   ```bash
   docker-compose build --no-cache
   ```

## Additional Commands

### Viewing Logs

To view the logs of the running containers:

```bash
docker-compose logs -f
```

### Running Commands in Containers

To run commands in a running container:

```bash
docker-compose exec frontend npm install some-package
docker-compose exec backend npm install some-package
```

### Accessing a Shell in a Container

To access a shell in a running container:

```bash
docker-compose exec frontend sh
docker-compose exec backend sh
```
