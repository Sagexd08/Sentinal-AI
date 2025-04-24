const { DetectionAgent } = require('./detection-agent');
const { DatabaseAgent } = require('./database-agent');
const { PolicyAgent } = require('./policy-agent');

/**
 * Agent Hub
 * Coordinates between different agents in the system
 */
class AgentHub {
  constructor() {
    this.name = 'Agent Hub';
    this.version = '1.0.0';
    this.detectionAgent = new DetectionAgent();
    this.databaseAgent = new DatabaseAgent();
    this.policyAgent = new PolicyAgent();
    
    console.log(`${this.name} initialized with agents:`);
    console.log(`- ${this.detectionAgent.name} v${this.detectionAgent.version}`);
    console.log(`- ${this.databaseAgent.name} v${this.databaseAgent.version}`);
    console.log(`- ${this.policyAgent.name} v${this.policyAgent.version}`);
  }

  /**
   * Analyze content using the detection agent
   * @param {string} content - The content to analyze
   * @param {string} contentType - The type of content (text, image, etc.)
   * @param {string} userId - Optional user ID for storing results
   * @returns {Object} Analysis result
   */
  async analyzeContent(content, contentType = 'text', userId = null) {
    console.log(`${this.name} coordinating content analysis...`);
    
    try {
      // Get current policies
      const policies = await this.policyAgent.getCurrentPolicies();
      
      // Analyze content with detection agent
      const analysisResult = await this.detectionAgent.analyzeContent(content, contentType);
      
      // Add timestamp to result
      analysisResult.analysis_timestamp = new Date();
      
      // Store result in database if user ID is provided
      if (userId) {
        // Create a content snippet for storage
        const contentSnippet = typeof content === 'string' 
          ? content.substring(0, 200) 
          : 'Non-text content';
          
        // Store analysis result
        await this.databaseAgent.storeAnalysisResult({
          ...analysisResult,
          content_snippet: contentSnippet
        }, userId);
      }
      
      return analysisResult;
    } catch (error) {
      console.error(`${this.name} error during content analysis:`, error);
      throw error;
    }
  }
  
  /**
   * Process user feedback
   * @param {Object} feedback - User feedback
   * @param {string} userId - User ID
   * @returns {Object} Processing result
   */
  async processFeedback(feedback, userId) {
    console.log(`${this.name} processing user feedback...`);
    
    try {
      // Store feedback in database
      const dbResult = await this.databaseAgent.storeFeedback({
        analysisId: feedback.analysisId,
        text: feedback.content,
        rating: feedback.rating
      }, userId);
      
      // Process feedback for policy updates
      const policyResult = await this.policyAgent.processFeedback({
        rating: feedback.rating,
        categories: feedback.categories,
        content: feedback.content
      });
      
      return {
        status: 'success',
        message: 'Feedback processed successfully',
        policy_updated: policyResult.updated,
        policy_message: policyResult.message
      };
    } catch (error) {
      console.error(`${this.name} error during feedback processing:`, error);
      throw error;
    }
  }
  
  /**
   * Get moderator analytics
   * @param {string} userId - User ID
   * @returns {Object} Analytics data
   */
  async getModeratorAnalytics(userId) {
    console.log(`${this.name} retrieving moderator analytics...`);
    
    try {
      // Get analytics from database agent
      const analyticsResult = await this.databaseAgent.getModeratorAnalytics(userId);
      
      if (!analyticsResult.success) {
        throw new Error(analyticsResult.error || 'Failed to retrieve analytics');
      }
      
      // Get current policies
      const policies = await this.policyAgent.getCurrentPolicies();
      
      // Combine data
      return {
        ...analyticsResult.data,
        policies: {
          sensitive_categories: policies.sensitiveCategories,
          auto_reject_threshold: policies.autoRejectScore,
          auto_approve_threshold: policies.autoApproveScore
        }
      };
    } catch (error) {
      console.error(`${this.name} error retrieving analytics:`, error);
      throw error;
    }
  }
  
  /**
   * Update content moderation policies
   * @param {Object} newPolicies - New policies to apply
   * @returns {Object} Update result
   */
  async updatePolicies(newPolicies = {}) {
    console.log(`${this.name} updating content moderation policies...`);
    
    try {
      // Update policies with policy agent
      const updateResult = await this.policyAgent.updatePolicies(newPolicies);
      
      return {
        status: updateResult.updated ? 'success' : 'warning',
        message: updateResult.message,
        updates: updateResult.updates
      };
    } catch (error) {
      console.error(`${this.name} error updating policies:`, error);
      throw error;
    }
  }
}

// Create and export a singleton instance
let agentHubInstance = null;

/**
 * Initialize the Agent Hub
 * @returns {AgentHub} Agent Hub instance
 */
function initAgentHub() {
  if (!agentHubInstance) {
    agentHubInstance = new AgentHub();
  }
  return agentHubInstance;
}

module.exports = { initAgentHub };
