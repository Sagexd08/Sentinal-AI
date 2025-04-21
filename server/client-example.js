/**
 * Example client for testing the Sentinal AI API
 * 
 * This script demonstrates how to interact with the Sentinal AI API
 * for content moderation and user feedback.
 */

const https = require('https');
const jwt = require('jsonwebtoken');

// Configuration
const API_BASE_URL = 'http://localhost:3001'; // Change to your API URL
const JWT_SECRET = 'GY8TqtKsQdAh87vyRXxwt/KKeggVTAMg5Se7NpmL0A3X8A3NZIqUy1V5VtoKKSj4I/UIXAkmogZqJJ6cYG46rg==';

// Generate a test JWT token
const generateToken = () => {
  const payload = {
    id: 'test-user-id',
    email: 'test@example.com',
    role: 'user'
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Make an API request
const makeRequest = async (method, path, data = null) => {
  const token = generateToken();
  const url = `${API_BASE_URL}${path}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            data: parsedData
          });
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
};

// Example: Flag content
const flagContent = async () => {
  try {
    const data = {
      content: 'This is some potentially harmful content that should be flagged.',
      contentType: 'text',
      reason: 'harmful',
      source: 'user-report'
    };
    
    const response = await makeRequest('POST', '/flag', data);
    console.log('Flag Content Response:', response);
  } catch (error) {
    console.error('Error flagging content:', error.message);
  }
};

// Example: Get moderation queue
const getModerationQueue = async () => {
  try {
    const response = await makeRequest('GET', '/flag?status=pending&limit=10');
    console.log('Moderation Queue Response:', response);
  } catch (error) {
    console.error('Error getting moderation queue:', error.message);
  }
};

// Example: Submit feedback
const submitFeedback = async () => {
  try {
    const data = {
      content: 'The content moderation system is working well!',
      feedbackType: 'general',
      rating: 5
    };
    
    const response = await makeRequest('POST', '/feedback', data);
    console.log('Submit Feedback Response:', response);
  } catch (error) {
    console.error('Error submitting feedback:', error.message);
  }
};

// Run the examples
const runExamples = async () => {
  console.log('=== Sentinal AI API Client Example ===');
  
  console.log('\n1. Flagging content...');
  await flagContent();
  
  console.log('\n2. Getting moderation queue...');
  await getModerationQueue();
  
  console.log('\n3. Submitting feedback...');
  await submitFeedback();
  
  console.log('\n=== Examples completed ===');
};

// Run the examples if this script is executed directly
if (require.main === module) {
  runExamples().catch(error => {
    console.error('Error running examples:', error);
  });
}

module.exports = {
  generateToken,
  makeRequest,
  flagContent,
  getModerationQueue,
  submitFeedback
};
