const express = require('express');
const router = express.Router();
const flagController = require('../controllers/flag.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @route POST /flag
 * @desc Flag content for moderation
 * @access Private
 */
router.post('/', verifyToken, flagController.flagContent);

/**
 * @route GET /flags
 * @desc Get moderation queue
 * @access Private
 */
router.get('/', verifyToken, flagController.getFlags);

/**
 * @route GET /flag/:id
 * @desc Get a specific flagged content
 * @access Private
 */
router.get('/:id', verifyToken, flagController.getFlagById);

/**
 * @route PUT /flag/:id
 * @desc Update flag status
 * @access Private
 */
router.put('/:id', verifyToken, flagController.updateFlagStatus);

module.exports = router;
