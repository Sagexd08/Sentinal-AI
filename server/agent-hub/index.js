/**
 * Agent Hub - Main Entry Point
 * 
 * This module orchestrates the AI agents for Sentinal AI content moderation.
 */

const { Orchestrator } = require('./orchestrator');
const { DetectionAgent } = require('./agents/detection-agent');
const { DatabaseAgent } = require('./agents/database-agent');
const { PolicyAgent } = require('./agents/policy-agent');

/**
 * Initialize the Agent Hub
 * @returns {Object} The Agent Hub instance
 */
const initAgentHub = () => {
  // Initialize individual agents
  const detectionAgent = new DetectionAgent();
  const databaseAgent = new DatabaseAgent();
  const policyAgent = new PolicyAgent();

  // Initialize orchestrator with agents
  const orchestrator = new Orchestrator({
    detectionAgent,
    databaseAgent,
    policyAgent
  });

  return {
    /**
     * Analyze content for moderation
     * @param {string} content - The content to analyze
     * @param {string} contentType - The type of content (text, image, etc.)
     * @param {Object} metadata - Additional metadata about the content
     * @returns {Promise<Object>} Analysis results
     */
    analyzeContent: async (content, contentType = 'text', metadata = {}) => {
      return orchestrator.processContent(content, contentType, metadata);
    },

    /**
     * Process user feedback to improve moderation
     * @param {Object} feedback - The user feedback
     * @returns {Promise<Object>} Processing results
     */
    processFeedback: async (feedback) => {
      return orchestrator.processFeedback(feedback);
    },

    /**
     * Update moderation policies based on analytics
     * @returns {Promise<Object>} Update results
     */
    updatePolicies: async () => {
      return orchestrator.updatePolicies();
    }
  };
};

module.exports = {
  initAgentHub
};
