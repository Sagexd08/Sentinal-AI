/**
 * Agent Orchestrator
 * 
 * Coordinates the activities of different AI agents in the system.
 */

const { RunnableSequence } = require('@langchain/core/runnables');
const { PromptTemplate } = require('@langchain/core/prompts');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { GoogleGenerativeAI } = require('@langchain/google-genai');
const { z } = require('zod');
const { StructuredOutputParser } = require('langchain/output_parsers');

class Orchestrator {
  /**
   * Create a new Orchestrator
   * @param {Object} agents - The agents to orchestrate
   * @param {DetectionAgent} agents.detectionAgent - Agent for content detection
   * @param {DatabaseAgent} agents.databaseAgent - Agent for database operations
   * @param {PolicyAgent} agents.policyAgent - Agent for policy management
   */
  constructor({ detectionAgent, databaseAgent, policyAgent }) {
    this.detectionAgent = detectionAgent;
    this.databaseAgent = databaseAgent;
    this.policyAgent = policyAgent;
    
    // Initialize the LLM
    this.llm = new GoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: 'gemini-pro',
    });
    
    // Define the output schema for content analysis
    this.analysisOutputParser = StructuredOutputParser.fromZodSchema(
      z.object({
        risk_score: z.number().min(0).max(1).describe('Risk score between 0 and 1'),
        risk_level: z.enum(['low', 'medium', 'high']).describe('Risk level assessment'),
        categories: z.array(z.string()).describe('Categories of potential issues'),
        recommendation: z.enum(['approve', 'review', 'reject']).describe('Recommended action'),
        explanation: z.string().describe('Explanation for the assessment'),
      })
    );
    
    // Create the content analysis chain
    this.contentAnalysisChain = this._createContentAnalysisChain();
  }
  
  /**
   * Create the content analysis chain
   * @returns {RunnableSequence} The content analysis chain
   * @private
   */
  _createContentAnalysisChain() {
    const analysisPrompt = PromptTemplate.fromTemplate(`
      You are a content moderation AI. Analyze the following {content_type} content for potential issues:

      CONTENT: {content}

      Provide a detailed analysis with the following information:
      1. Risk level (low, medium, high)
      2. Risk score (0.0 to 1.0)
      3. Categories of potential issues (harmful, profanity, sensitive, safe)
      4. Recommendation (approve, review, reject)
      5. Explanation for your assessment

      {format_instructions}
    `);
    
    return RunnableSequence.from([
      {
        content: (input) => input.content,
        content_type: (input) => input.contentType,
        format_instructions: () => this.analysisOutputParser.getFormatInstructions(),
      },
      analysisPrompt,
      this.llm,
      this.analysisOutputParser,
    ]);
  }
  
  /**
   * Process content through the agent system
   * @param {string} content - The content to process
   * @param {string} contentType - The type of content
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<Object>} Processing results
   */
  async processContent(content, contentType = 'text', metadata = {}) {
    try {
      // Step 1: Get current policies from policy agent
      const policies = await this.policyAgent.getCurrentPolicies();
      
      // Step 2: Analyze content with detection agent
      const detectionResult = await this.detectionAgent.analyzeContent(
        content, 
        contentType,
        policies
      );
      
      // Step 3: Run the content through the LLM chain for additional analysis
      const llmAnalysis = await this.contentAnalysisChain.invoke({
        content,
        contentType
      });
      
      // Step 4: Combine results from detection agent and LLM
      const combinedAnalysis = this._combineAnalysisResults(detectionResult, llmAnalysis);
      
      // Step 5: Store results in database
      await this.databaseAgent.storeAnalysisResult(combinedAnalysis, content, contentType, metadata);
      
      // Return the combined analysis
      return {
        ...combinedAnalysis,
        analysis_timestamp: new Date().toISOString(),
        model_version: 'sentinal-ai-v1.0',
        content_type: contentType
      };
    } catch (error) {
      console.error('Error in content processing:', error);
      throw new Error(`Content processing failed: ${error.message}`);
    }
  }
  
  /**
   * Combine analysis results from different sources
   * @param {Object} detectionResult - Results from detection agent
   * @param {Object} llmAnalysis - Results from LLM analysis
   * @returns {Object} Combined analysis
   * @private
   */
  _combineAnalysisResults(detectionResult, llmAnalysis) {
    // Combine categories (unique values only)
    const categories = [...new Set([
      ...(detectionResult.categories || []),
      ...(llmAnalysis.categories || [])
    ])];
    
    // Average the risk scores
    const riskScore = (
      (detectionResult.risk_score || 0) + 
      (llmAnalysis.risk_score || 0)
    ) / 2;
    
    // Determine risk level based on combined score
    let riskLevel;
    if (riskScore >= 0.7) {
      riskLevel = 'high';
    } else if (riskScore >= 0.3) {
      riskLevel = 'medium';
    } else {
      riskLevel = 'low';
    }
    
    // Determine recommendation based on risk level
    let recommendation;
    if (riskLevel === 'high') {
      recommendation = 'reject';
    } else if (riskLevel === 'medium') {
      recommendation = 'review';
    } else {
      recommendation = 'approve';
    }
    
    return {
      risk_score: riskScore,
      risk_level: riskLevel,
      categories,
      recommendation,
      explanation: llmAnalysis.explanation || detectionResult.explanation || '',
      detection_confidence: detectionResult.confidence || 0.9
    };
  }
  
  /**
   * Process user feedback to improve the system
   * @param {Object} feedback - The user feedback
   * @returns {Promise<Object>} Processing results
   */
  async processFeedback(feedback) {
    try {
      // Store feedback in database
      await this.databaseAgent.storeFeedback(feedback);
      
      // Update policy agent with new feedback
      const policyUpdate = await this.policyAgent.processFeedback(feedback);
      
      return {
        status: 'success',
        message: 'Feedback processed successfully',
        policy_updates: policyUpdate
      };
    } catch (error) {
      console.error('Error processing feedback:', error);
      throw new Error(`Feedback processing failed: ${error.message}`);
    }
  }
  
  /**
   * Update moderation policies based on analytics
   * @returns {Promise<Object>} Update results
   */
  async updatePolicies() {
    try {
      // Get analytics from database
      const analytics = await this.databaseAgent.getModeratorAnalytics();
      
      // Update policies based on analytics
      const policyUpdates = await this.policyAgent.updatePolicies(analytics);
      
      return {
        status: 'success',
        message: 'Policies updated successfully',
        updates: policyUpdates
      };
    } catch (error) {
      console.error('Error updating policies:', error);
      throw new Error(`Policy update failed: ${error.message}`);
    }
  }
}

module.exports = {
  Orchestrator
};
