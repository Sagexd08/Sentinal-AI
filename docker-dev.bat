@echo off
REM Script to run Docker Compose commands for development

REM Function to display help message
:show_help
echo Usage: docker-dev.bat [COMMAND]
echo.
echo Commands:
echo   up        Start the development environment
echo   down      Stop the development environment
echo   build     Build the Docker images
echo   logs      View the logs of the running containers
echo   frontend  Access a shell in the frontend container
echo   backend   Access a shell in the backend container
echo   help      Display this help message
echo.
goto :eof

REM Check if a command was provided
if "%1"=="" (
  call :show_help
  exit /b 1
)

REM Process the command
if "%1"=="up" (
  echo Starting the development environment...
  docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
) else if "%1"=="down" (
  echo Stopping the development environment...
  docker-compose down
) else if "%1"=="build" (
  echo Building the Docker images...
  docker-compose -f docker-compose.yml -f docker-compose.override.yml build
) else if "%1"=="logs" (
  echo Viewing the logs of the running containers...
  docker-compose logs -f
) else if "%1"=="frontend" (
  echo Accessing a shell in the frontend container...
  docker-compose exec frontend sh
) else if "%1"=="backend" (
  echo Accessing a shell in the backend container...
  docker-compose exec backend sh
) else if "%1"=="help" (
  call :show_help
) else (
  echo Unknown command: %1
  call :show_help
  exit /b 1
)
