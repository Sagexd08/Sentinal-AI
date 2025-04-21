# Sentinal AI Backend Server

This is the backend server for Sentinal AI, providing RESTful API endpoints for content moderation and user feedback, powered by an autonomous AI agent system.

## Features

- **Content Moderation API**: Flag and manage potentially harmful content
- **User Feedback Collection**: Gather and analyze user feedback
- **AI Agent Hub**: Orchestrated AI agents for intelligent content analysis
- **Adaptive Policies**: Self-improving moderation rules based on feedback
- **Supabase Integration**: Secure and scalable data storage
- **JWT Authentication**: Secure API endpoints

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=3001
   NODE_ENV=development
   SUPABASE_URL=https://fkuzdgnidoiksdrulcav.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.…By7oKv0Am0
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.…tB0A6dOY
   JWT_SECRET=GY8TqtKsQdAh87vyRXxwt/KKeggVTAMg5Se7NpmL0A3X8A3NZIqUy1V5VtoKKSj4I/UIXAkmogZqJJ6cYG46rg==
   GEMINI_API_KEY=AIzaSyD6F_MBHqrf-TDdzzbuOt7ZYI6ROP-dL5s
   ```

3. Start the server:
   ```
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL script in `supabase/schema.sql` to set up the required tables and policies
3. Update your environment variables with the Supabase URL and keys

## AI Agent System

The backend includes an autonomous AI agent system built with LangChain.js that consists of:

1. **Detection Agent**: Analyzes content using Google's Gemini API to detect potentially harmful content
2. **Database Agent**: Manages interactions with Supabase for storing and retrieving data
3. **Policy Agent**: Updates moderation rules based on feedback and analytics

These agents are orchestrated to work together, providing intelligent content moderation that improves over time.

## API Endpoints

### Content Moderation

#### Flag Content

```
POST /flag
```

Request body:
```json
{
  "content": "Content to flag",
  "contentType": "text",
  "source": "user",
  "reason": "inappropriate",
  "metadata": {}
}
```

Response:
```json
{
  "message": "Content flagged successfully",
  "flag": {
    "id": "uuid",
    "content": "Content to flag",
    "content_type": "text",
    "status": "pending",
    "created_at": "2023-06-01T12:00:00Z"
  }
}
```

#### Get Moderation Queue

```
GET /flags
```

Query parameters:
- `status`: Filter by status (pending, approved, rejected, escalated)
- `limit`: Number of results to return (default: 50)
- `offset`: Pagination offset (default: 0)

Response:
```json
{
  "flags": [
    {
      "id": "uuid",
      "content": "Flagged content",
      "content_type": "text",
      "status": "pending",
      "created_at": "2023-06-01T12:00:00Z"
    }
  ],
  "count": 1,
  "limit": 50,
  "offset": 0
}
```

#### Get Flag by ID

```
GET /flag/:id
```

Response:
```json
{
  "flag": {
    "id": "uuid",
    "content": "Flagged content",
    "content_type": "text",
    "status": "pending",
    "created_at": "2023-06-01T12:00:00Z"
  }
}
```

#### Update Flag Status

```
PUT /flag/:id
```

Request body:
```json
{
  "status": "approved",
  "moderator_notes": "Content reviewed and approved"
}
```

Response:
```json
{
  "message": "Flag status updated successfully",
  "flag": {
    "id": "uuid",
    "content": "Flagged content",
    "status": "approved",
    "moderator_notes": "Content reviewed and approved",
    "moderated_at": "2023-06-01T13:00:00Z"
  }
}
```

### Policy Management

#### Get Current Policies

```
GET /policy
```

Response:
```json
{
  "policies": {
    "version": "1.0",
    "updated_at": "2023-06-01T12:00:00Z",
    "sensitiveCategories": ["harmful", "profanity", "sensitive"],
    "thresholds": {
      "harmful": 0.5,
      "profanity": 0.6,
      "sensitive": 0.5
    },
    "rules": ["Content with a risk score above 0.7 should be rejected"]
  }
}
```

#### Update Policies

```
POST /policy/update
```

Response:
```json
{
  "message": "Policy update process completed",
  "result": {
    "updated": true,
    "message": "Policies updated based on analytics",
    "updates": [
      {
        "type": "threshold_decrease",
        "category": "harmful",
        "old_value": 0.5,
        "new_value": 0.45,
        "reason": "High false negative rate"
      }
    ]
  }
}
```

### User Feedback

#### Submit Feedback

```
POST /feedback
```

Request body:
```json
{
  "content": "Feedback content",
  "feedbackType": "general",
  "rating": 4,
  "metadata": {}
}
```

Response:
```json
{
  "message": "Feedback submitted successfully",
  "feedback": {
    "id": "uuid",
    "content": "Feedback content",
    "feedback_type": "general",
    "rating": 4,
    "created_at": "2023-06-01T12:00:00Z"
  }
}
```

#### Get All Feedback

```
GET /feedback
```

Query parameters:
- `feedbackType`: Filter by feedback type
- `limit`: Number of results to return (default: 50)
- `offset`: Pagination offset (default: 0)

Response:
```json
{
  "feedback": [
    {
      "id": "uuid",
      "content": "Feedback content",
      "feedback_type": "general",
      "rating": 4,
      "created_at": "2023-06-01T12:00:00Z"
    }
  ],
  "count": 1,
  "limit": 50,
  "offset": 0
}
```

#### Get Feedback by ID

```
GET /feedback/:id
```

Response:
```json
{
  "feedback": {
    "id": "uuid",
    "content": "Feedback content",
    "feedback_type": "general",
    "rating": 4,
    "created_at": "2023-06-01T12:00:00Z"
  }
}
```

## Authentication

All API endpoints require JWT authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Testing

Run the tests:

```
npm test
```

## Docker Deployment

1. Build the Docker image:
   ```
   docker build -t sentinal-ai-backend .
   ```

2. Run the container:
   ```
   docker run -p 3001:3001 --env-file .env sentinal-ai-backend
   ```

Or use docker-compose:
```
docker-compose up
```
