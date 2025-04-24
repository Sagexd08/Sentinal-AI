const { supabaseAdmin } = require('../utils/supabase');

/**
 * Database Agent
 * Responsible for interacting with the database and storing analysis results
 */
class DatabaseAgent {
  constructor() {
    this.name = 'Database Agent';
    this.version = '1.0.0';
    this.db = supabaseAdmin;
  }

  /**
   * Store analysis result in the database
   * @param {Object} analysisResult - The analysis result to store
   * @param {string} userId - The user ID associated with the analysis
   * @returns {Object} Operation result
   */
  async storeAnalysisResult(analysisResult, userId) {
    console.log(`${this.name} storing analysis result for user ${userId}...`);
    
    try {
      // Store analysis result in database
      const { data, error } = await this.db
        .from('content_analyses')
        .insert({
          user_id: userId,
          content_type: analysisResult.content_type,
          content_snippet: analysisResult.content_snippet || 'No content snippet available',
          risk_score: analysisResult.risk_score,
          risk_level: analysisResult.risk_level,
          categories: analysisResult.categories,
          recommendation: analysisResult.recommendation,
          analysis_timestamp: new Date()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error storing analysis result:', error);
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Database agent error:', error);
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Store user feedback in the database
   * @param {Object} feedback - The feedback to store
   * @param {string} userId - The user ID associated with the feedback
   * @returns {Object} Operation result
   */
  async storeFeedback(feedback, userId) {
    console.log(`${this.name} storing feedback for user ${userId}...`);
    
    try {
      // Store feedback in database
      const { data, error } = await this.db
        .from('feedback')
        .insert({
          analysis_id: feedback.analysisId,
          user_id: userId,
          feedback_text: feedback.text,
          rating: feedback.rating,
          created_at: new Date()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error storing feedback:', error);
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Database agent error:', error);
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Get moderator analytics data
   * @param {string} userId - The user ID to get analytics for
   * @returns {Object} Analytics data
   */
  async getModeratorAnalytics(userId) {
    console.log(`${this.name} retrieving analytics for user ${userId}...`);
    
    try {
      // Get total analyses count
      const { count: totalAnalyses, error: countError } = await this.db
        .from('content_analyses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);
        
      if (countError) {
        console.error('Error getting total analyses:', countError);
        return { success: false, error: countError.message };
      }
      
      // Get status counts
      const { data: statusData, error: statusError } = await this.db
        .from('content_analyses')
        .select('recommendation')
        .eq('user_id', userId);
        
      if (statusError) {
        console.error('Error getting status counts:', statusError);
        return { success: false, error: statusError.message };
      }
      
      // Calculate status counts
      const statusCounts = statusData.reduce((acc, item) => {
        acc[item.recommendation] = (acc[item.recommendation] || 0) + 1;
        return acc;
      }, {});
      
      // Get false positive/negative rates (placeholder values)
      // In a real system, this would be calculated based on feedback data
      const falsePositiveRate = 0.05;
      const falseNegativeRate = 0.02;
      
      return {
        success: true,
        data: {
          status_counts: {
            approve: statusCounts.approve || 0,
            review: statusCounts.review || 0,
            reject: statusCounts.reject || 0
          },
          false_positive_rate: falsePositiveRate,
          false_negative_rate: falseNegativeRate,
          total_analyzed: totalAnalyses || 0
        }
      };
    } catch (error) {
      console.error('Database agent error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = { DatabaseAgent };
