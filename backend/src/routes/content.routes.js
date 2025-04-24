const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content.controller');
const { authenticate } = require('../middleware/auth.middleware');

/**
 * @route POST /api/content/analyze
 * @desc Analyze content for security threats
 * @access Private
 */
router.post('/analyze', authenticate, contentController.analyzeContent);

/**
 * @route GET /api/content/history
 * @desc Get content analysis history
 * @access Private
 */
router.get('/history', authenticate, contentController.getAnalysisHistory);

/**
 * @route GET /api/content/report/:id
 * @desc Get detailed report for a specific analysis
 * @access Private
 */
router.get('/report/:id', authenticate, contentController.getAnalysisReport);

/**
 * @route POST /api/content/feedback
 * @desc Submit feedback for an analysis
 * @access Private
 */
router.post('/feedback', authenticate, contentController.submitFeedback);

module.exports = router;
