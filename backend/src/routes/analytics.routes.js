const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

/**
 * @route GET /api/analytics/dashboard
 * @desc Get dashboard analytics data
 * @access Private
 */
router.get('/dashboard', authenticate, analyticsController.getDashboardData);

/**
 * @route GET /api/analytics/threats
 * @desc Get threat analytics data
 * @access Private
 */
router.get('/threats', authenticate, analyticsController.getThreatAnalytics);

/**
 * @route GET /api/analytics/performance
 * @desc Get system performance metrics
 * @access Private (Admin only)
 */
router.get('/performance', authenticate, authorize(['admin']), analyticsController.getPerformanceMetrics);

/**
 * @route GET /api/analytics/reports
 * @desc Get custom analytics reports
 * @access Private
 */
router.get('/reports', authenticate, analyticsController.getCustomReports);

module.exports = router;
