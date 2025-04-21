/**
 * Database Agent
 * 
 * Responsible for interacting with the Supabase database.
 */

const { supabaseAdmin } = require('../../config/supabase');

class DatabaseAgent {
  constructor() {
    this.supabase = supabaseAdmin;
  }

  /**
   * Store content analysis result in the database
   * @param {Object} analysis - The analysis result
   * @param {string} content - The analyzed content
   * @param {string} contentType - The type of content
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<Object>} Database operation result
   */
  async storeAnalysisResult(analysis, content, contentType, metadata = {}) {
    try {
      // Insert into flagged_content table
      const { data, error } = await this.supabase
        .from('flagged_content')
        .insert({
          content,
          content_type: contentType,
          source: metadata.source || 'ai',
          reason: metadata.reason || 'automated-detection',
          metadata: metadata,
          user_id: metadata.userId || null,
          ai_analysis: analysis,
          status: this._determineInitialStatus(analysis)
        })
        .select();
      
      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Database agent error:', error);
      throw new Error(`Failed to store analysis result: ${error.message}`);
    }
  }

  /**
   * Store user feedback in the database
   * @param {Object} feedback - The user feedback
   * @returns {Promise<Object>} Database operation result
   */
  async storeFeedback(feedback) {
    try {
      const { data, error } = await this.supabase
        .from('user_feedback')
        .insert({
          content: feedback.content,
          feedback_type: feedback.feedbackType || 'general',
          rating: feedback.rating || null,
          metadata: feedback.metadata || {},
          user_id: feedback.userId || null
        })
        .select();
      
      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Database agent error:', error);
      throw new Error(`Failed to store feedback: ${error.message}`);
    }
  }

  /**
   * Get analytics data for policy updates
   * @returns {Promise<Object>} Analytics data
   */
  async getModeratorAnalytics() {
    try {
      // Get statistics on flagged content
      const { data: flagStats, error: flagError } = await this.supabase
        .from('flagged_content')
        .select('status, ai_analysis')
        .order('created_at', { ascending: false })
        .limit(1000);
      
      if (flagError) {
        throw new Error(`Database error: ${flagError.message}`);
      }
      
      // Get recent feedback
      const { data: recentFeedback, error: feedbackError } = await this.supabase
        .from('user_feedback')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (feedbackError) {
        throw new Error(`Database error: ${feedbackError.message}`);
      }
      
      // Process the data to extract useful analytics
      const analytics = this._processAnalyticsData(flagStats, recentFeedback);
      
      return analytics;
    } catch (error) {
      console.error('Database agent error:', error);
      throw new Error(`Failed to get analytics: ${error.message}`);
    }
  }

  /**
   * Process raw data into useful analytics
   * @param {Array} flagStats - Statistics on flagged content
   * @param {Array} recentFeedback - Recent user feedback
   * @returns {Object} Processed analytics
   * @private
   */
  _processAnalyticsData(flagStats, recentFeedback) {
    // Count statuses
    const statusCounts = flagStats.reduce((counts, item) => {
      counts[item.status] = (counts[item.status] || 0) + 1;
      return counts;
    }, {});
    
    // Calculate false positive rate
    // (content that was flagged by AI but approved by moderators)
    const aiRejectedCount = flagStats.filter(item => 
      item.ai_analysis && 
      item.ai_analysis.recommendation === 'reject'
    ).length;
    
    const falsePositives = flagStats.filter(item => 
      item.status === 'approved' && 
      item.ai_analysis && 
      item.ai_analysis.recommendation === 'reject'
    ).length;
    
    const falsePositiveRate = aiRejectedCount > 0 
      ? falsePositives / aiRejectedCount 
      : 0;
    
    // Calculate false negative rate
    // (content that was approved by AI but rejected by moderators)
    const aiApprovedCount = flagStats.filter(item => 
      item.ai_analysis && 
      item.ai_analysis.recommendation === 'approve'
    ).length;
    
    const falseNegatives = flagStats.filter(item => 
      item.status === 'rejected' && 
      item.ai_analysis && 
      item.ai_analysis.recommendation === 'approve'
    ).length;
    
    const falseNegativeRate = aiApprovedCount > 0 
      ? falseNegatives / aiApprovedCount 
      : 0;
    
    // Analyze feedback
    const averageFeedbackRating = recentFeedback
      .filter(item => item.rating !== null)
      .reduce((sum, item) => sum + item.rating, 0) / 
      recentFeedback.filter(item => item.rating !== null).length || 0;
    
    // Identify common categories in flagged content
    const categoryFrequency = {};
    flagStats.forEach(item => {
      if (item.ai_analysis && item.ai_analysis.categories) {
        item.ai_analysis.categories.forEach(category => {
          categoryFrequency[category] = (categoryFrequency[category] || 0) + 1;
        });
      }
    });
    
    return {
      status_counts: statusCounts,
      false_positive_rate: falsePositiveRate,
      false_negative_rate: falseNegativeRate,
      average_feedback_rating: averageFeedbackRating,
      category_frequency: categoryFrequency,
      total_analyzed: flagStats.length,
      total_feedback: recentFeedback.length
    };
  }

  /**
   * Determine initial status based on analysis
   * @param {Object} analysis - The analysis result
   * @returns {string} Initial status
   * @private
   */
  _determineInitialStatus(analysis) {
    if (!analysis) return 'pending';
    
    switch (analysis.recommendation) {
      case 'approve':
        return 'approved';
      case 'reject':
        return 'rejected';
      case 'review':
      default:
        return 'pending';
    }
  }
}

module.exports = {
  DatabaseAgent
};
