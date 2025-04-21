const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @route POST /feedback
 * @desc Submit user feedback
 * @access Private
 */
router.post('/', verifyToken, feedbackController.submitFeedback);

/**
 * @route GET /feedback
 * @desc Get all feedback
 * @access Private
 */
router.get('/', verifyToken, feedbackController.getAllFeedback);

/**
 * @route GET /feedback/:id
 * @desc Get feedback by ID
 * @access Private
 */
router.get('/:id', verifyToken, feedbackController.getFeedbackById);

module.exports = router;
