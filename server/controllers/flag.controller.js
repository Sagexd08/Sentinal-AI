const { supabaseAdmin } = require('../config/supabase');
const { analyzeContent, updatePolicies } = require('../utils/ai-agent');

/**
 * Flag content for moderation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const flagContent = async (req, res) => {
  try {
    const { content, contentType, source, reason, metadata } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    // Enhanced AI analysis of the content with metadata
    let aiAnalysis = null;
    try {
      // Pass metadata to provide context for analysis
      const enhancedMetadata = {
        ...metadata,
        userId: req.user.id,
        source: source || 'user',
        reason: reason || 'inappropriate'
      };

      aiAnalysis = await analyzeContent(content, contentType || 'text', enhancedMetadata);
    } catch (aiError) {
      console.error('AI analysis failed:', aiError);
      // Continue without AI analysis
    }

    // Determine initial status based on AI analysis
    let initialStatus = 'pending';
    if (aiAnalysis && aiAnalysis.recommendation) {
      if (aiAnalysis.recommendation === 'approve') {
        initialStatus = 'approved';
      } else if (aiAnalysis.recommendation === 'reject') {
        initialStatus = 'rejected';
      }
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('flagged_content')
      .insert({
        content,
        content_type: contentType || 'text',
        source: source || 'user',
        reason: reason || 'inappropriate',
        metadata: metadata || {},
        user_id: req.user.id,
        ai_analysis: aiAnalysis,
        status: initialStatus
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to flag content', error });
    }

    return res.status(201).json({
      message: 'Content flagged successfully',
      flag: data[0],
      ai_analysis: aiAnalysis
    });
  } catch (error) {
    console.error('Error flagging content:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Get all flagged content (moderation queue)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getFlags = async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let query = supabaseAdmin
      .from('flagged_content')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to retrieve flagged content', error });
    }

    return res.status(200).json({
      flags: data,
      count,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error retrieving flagged content:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Get a specific flagged content by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getFlagById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('flagged_content')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to retrieve flagged content', error });
    }

    if (!data) {
      return res.status(404).json({ message: 'Flagged content not found' });
    }

    return res.status(200).json({ flag: data });
  } catch (error) {
    console.error('Error retrieving flagged content:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Update flag status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateFlagStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, moderator_notes } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'escalated'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status',
        validStatuses
      });
    }

    // Get the current flag data to compare with new status
    const { data: currentFlag, error: fetchError } = await supabaseAdmin
      .from('flagged_content')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Supabase error:', fetchError);
      return res.status(500).json({ message: 'Failed to retrieve flagged content', error: fetchError });
    }

    if (!currentFlag) {
      return res.status(404).json({ message: 'Flagged content not found' });
    }

    // Update the flag status
    const { data, error } = await supabaseAdmin
      .from('flagged_content')
      .update({
        status,
        moderator_notes: moderator_notes || null,
        moderated_at: new Date().toISOString(),
        moderator_id: req.user.id
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ message: 'Failed to update flag status', error });
    }

    // Check if this is a status change that should trigger policy updates
    // (e.g., if AI recommended one action but moderator chose another)
    let policyUpdateResult = null;
    try {
      if (currentFlag.ai_analysis &&
          currentFlag.ai_analysis.recommendation &&
          ((currentFlag.ai_analysis.recommendation === 'approve' && status === 'rejected') ||
           (currentFlag.ai_analysis.recommendation === 'reject' && status === 'approved'))) {

        // This is a case where AI and human moderator disagreed
        // Trigger policy update in the background
        updatePolicies().catch(policyError => {
          console.warn('Policy update error:', policyError);
        });

        policyUpdateResult = { triggered: true, message: 'Policy update triggered due to AI/human disagreement' };
      }
    } catch (policyError) {
      console.warn('Error checking for policy update:', policyError);
      // Continue even if policy check fails
    }

    return res.status(200).json({
      message: 'Flag status updated successfully',
      flag: data[0],
      policy_update: policyUpdateResult
    });
  } catch (error) {
    console.error('Error updating flag status:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  flagContent,
  getFlags,
  getFlagById,
  updateFlagStatus
};
