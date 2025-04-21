const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/**
 * @route POST /auth/test-token
 * @desc Generate a test JWT token for development
 * @access Public
 */
router.post('/test-token', (req, res) => {
  // Only allow in development environment
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ message: 'This endpoint is only available in development mode' });
  }
  
  // Create a test user payload
  const payload = {
    id: 'test-user-id',
    email: 'test@example.com',
    role: 'moderator', // Give test user moderator role for full access
    name: 'Test User'
  };
  
  // Sign the token
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  
  return res.status(200).json({
    message: 'Test token generated successfully',
    token,
    user: payload
  });
});

module.exports = router;
