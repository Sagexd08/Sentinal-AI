// Simple health check endpoint
module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Sentinal AI API is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
};
