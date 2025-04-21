const fs = require('fs').promises;
const path = require('path');
const { updatePolicies: aiUpdatePolicies } = require('../utils/ai-agent');

/**
 * Get current moderation policies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPolicies = async (req, res) => {
  try {
    const policiesPath = path.join(__dirname, '../config/moderation-policies.json');

    try {
      // Read policies from file
      const policyData = await fs.readFile(policiesPath, 'utf8');
      const policies = JSON.parse(policyData);

      return res.status(200).json({ policies });
    } catch (fileError) {
      console.error('Error reading policies file:', fileError);
      return res.status(500).json({
        message: 'Failed to read policies file',
        error: fileError.message
      });
    }
  } catch (error) {
    console.error('Error retrieving policies:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Trigger policy update based on analytics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updatePolicies = async (req, res) => {
  try {
    // Check if user has admin/moderator role
    if (!req.user.role || req.user.role !== 'moderator') {
      return res.status(403).json({
        message: 'Unauthorized. Only moderators can update policies'
      });
    }

    // Trigger policy update
    const result = await aiUpdatePolicies();

    return res.status(200).json({
      message: 'Policy update process completed',
      result
    });
  } catch (error) {
    console.error('Error updating policies:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  getPolicies,
  updatePolicies
};
