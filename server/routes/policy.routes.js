const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policy.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @route GET /policy
 * @desc Get current moderation policies
 * @access Private
 */
router.get('/', verifyToken, policyController.getPolicies);

/**
 * @route POST /policy/update
 * @desc Trigger policy update based on analytics
 * @access Private
 */
router.post('/update', verifyToken, policyController.updatePolicies);

module.exports = router;
