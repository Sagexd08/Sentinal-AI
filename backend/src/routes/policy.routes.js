const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { initAgentHub } = require('../agents/agent-hub');

/**
 * @route GET /api/policy
 * @desc Get current content moderation policies
 * @access Private (Admin only)
 */
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const agentHub = initAgentHub();
    const policyAgent = agentHub.policyAgent;
    const policies = await policyAgent.getCurrentPolicies();
    
    return res.status(200).json({
      success: true,
      policies
    });
  } catch (error) {
    console.error('Get policies error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching policies'
    });
  }
});

/**
 * @route PUT /api/policy
 * @desc Update content moderation policies
 * @access Private (Admin only)
 */
router.put('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const newPolicies = req.body;
    
    if (!newPolicies || Object.keys(newPolicies).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No policy updates provided'
      });
    }
    
    const agentHub = initAgentHub();
    const result = await agentHub.updatePolicies(newPolicies);
    
    return res.status(200).json({
      success: true,
      message: result.message,
      updates: result.updates
    });
  } catch (error) {
    console.error('Update policies error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating policies'
    });
  }
});

module.exports = router;
