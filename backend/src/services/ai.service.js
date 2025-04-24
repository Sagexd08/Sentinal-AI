/**
 * AI service for content analysis
 * Uses the Agent Hub to coordinate content analysis
 */
const { initAgentHub } = require('../agents/agent-hub');

/**
 * Analyze content using AI
 * @param {string} content - The content to analyze
 * @param {string} contentType - The type of content (text, image, etc.)
 * @param {string} userId - Optional user ID for storing results
 * @returns {Object} Analysis result
 */
exports.analyzeContentWithAI = async (content, contentType = 'text', userId = null) => {
  try {
    // Initialize the agent hub
    const agentHub = initAgentHub();

    // Use the agent hub to analyze content
    const result = await agentHub.analyzeContent(content, contentType, userId);

    return result;
  } catch (error) {
    console.error('AI service error:', error);
    throw error;
  }
};
