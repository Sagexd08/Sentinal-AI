const { supabaseAdmin } = require('../utils/supabase');
const { analyzeContentWithAI } = require('../services/ai.service');

/**
 * Analyze content for security threats
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.analyzeContent = async (req, res) => {
  try {
    const { content, contentType = 'text' } = req.body;
    const userId = req.user?.id;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    // Analyze content using AI service with user ID
    // The agent hub will handle storing the result in the database
    const analysisResult = await analyzeContentWithAI(content, contentType, userId);

    return res.status(200).json({
      success: true,
      analysis: {
        id: data?.id,
        risk_score: analysisResult.risk_score,
        risk_level: analysisResult.risk_level,
        categories: analysisResult.categories,
        recommendation: analysisResult.recommendation,
        explanation: analysisResult.explanation,
        analysis_timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Content analysis error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during content analysis'
    });
  }
};

/**
 * Get content analysis history
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    // Get analysis history from database
    const { data, error, count } = await supabaseAdmin
      .from('content_analyses')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('analysis_timestamp', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      history: data,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get analysis history error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching analysis history'
    });
  }
};

/**
 * Get detailed report for a specific analysis
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAnalysisReport = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Get analysis report from database
    const { data, error } = await supabaseAdmin
      .from('content_analyses')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: 'Analysis report not found'
      });
    }

    return res.status(200).json({
      success: true,
      report: data
    });
  } catch (error) {
    console.error('Get analysis report error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching analysis report'
    });
  }
};

/**
 * Submit feedback for an analysis
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.submitFeedback = async (req, res) => {
  try {
    const { analysisId, feedback, rating, categories } = req.body;
    const userId = req.user.id;

    if (!analysisId || !feedback || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Analysis ID, feedback, and rating are required'
      });
    }

    // Initialize the agent hub
    const { initAgentHub } = require('../agents/agent-hub');
    const agentHub = initAgentHub();

    // Process feedback using the agent hub
    const result = await agentHub.processFeedback({
      analysisId,
      content: feedback,
      rating,
      categories: categories || []
    }, userId);

    return res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      policy_updated: result.policy_updated,
      policy_message: result.policy_message
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting feedback'
    });
  }
};
