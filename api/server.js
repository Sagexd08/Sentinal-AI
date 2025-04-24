const app = require('./index');

// This is the serverless function handler
module.exports = (req, res) => {
  // Handle the request using the Express app
  return app(req, res);
};
