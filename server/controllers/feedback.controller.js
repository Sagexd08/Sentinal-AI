const { supabaseAdmin } = require('../config/supabase');
const { processFeedback } = require('../utils/ai-agent');

/**
 * Submit user feedback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const submitFeedback = async (req, res) => {
  try {
    const { content, feedbackType, rating, metadata } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Feedback content is required' });
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('user_feedback')
      .insert({
        content,
        feedback_type: feedbackType || 'general',
        rating: rating || null,
        metadata: metadata || {},
        user_id: req.user.id
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to submit feedback', error });
    }

    // Process feedback with AI agent for policy updates
    let policyUpdates = null;
    try {
      if (feedbackType === 'policy' || feedbackType === 'moderation') {
        const feedbackData = {
          content,
          feedbackType,
          rating,
          metadata,
          userId: req.user.id
        };

        policyUpdates = await processFeedback(feedbackData);
      }
    } catch (aiError) {
      console.warn('AI feedback processing error:', aiError);
      // Continue even if AI processing fails
    }

    return res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: data[0],
      policy_updates: policyUpdates
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Get all feedback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllFeedback = async (req, res) => {
  try {
    const { feedbackType, limit = 50, offset = 0 } = req.query;

    let query = supabaseAdmin
      .from('user_feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by feedback type if provided
    if (feedbackType) {
      query = query.eq('feedback_type', feedbackType);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to retrieve feedback', error });
    }

    return res.status(200).json({
      feedback: data,
      count,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Get feedback by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('user_feedback')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to retrieve feedback', error });
    }

    if (!data) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    return res.status(200).json({ feedback: data });
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
  getFeedbackById
};
