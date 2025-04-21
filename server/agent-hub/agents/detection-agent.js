/**
 * Detection Agent
 * 
 * Responsible for analyzing content and detecting potential issues.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

class DetectionAgent {
  constructor() {
    // Initialize the Gemini API client
    this.geminiModel = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      .getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Analyze content for potential issues
   * @param {string} content - The content to analyze
   * @param {string} contentType - The type of content (text, image, etc.)
   * @param {Object} policies - Current moderation policies
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeContent(content, contentType = 'text', policies = {}) {
    try {
      // For text content, use Gemini API
      if (contentType === 'text') {
        return await this._analyzeTextWithGemini(content, policies);
      }
      
      // For image content, we would implement image analysis here
      // Currently returning a mock response for non-text content
      return this._mockAnalysis(content, contentType);
    } catch (error) {
      console.error('Detection agent error:', error);
      // Fallback to mock analysis if API fails
      return this._mockAnalysis(content, contentType);
    }
  }

  /**
   * Analyze text content using Gemini API
   * @param {string} content - The text content to analyze
   * @param {Object} policies - Current moderation policies
   * @returns {Promise<Object>} Analysis results
   * @private
   */
  async _analyzeTextWithGemini(content, policies) {
    // Create a prompt that incorporates current policies
    const policyString = this._formatPoliciesForPrompt(policies);
    
    const prompt = `
      You are a content moderation AI. Analyze the following text content for potential issues:

      CONTENT: ${content}

      CURRENT MODERATION POLICIES:
      ${policyString}

      Provide a detailed analysis with the following information:
      1. Risk level (low, medium, high)
      2. Risk score (0.0 to 1.0)
      3. Categories of potential issues (harmful, profanity, sensitive, safe)
      4. Recommendation (approve, review, reject)
      5. Explanation for your assessment

      Format your response as a JSON object with these fields.
    `;

    // Call Gemini API
    const result = await this.geminiModel.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON from response
    try {
      // Find JSON in the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not extract JSON from Gemini response');
      }
      
      const analysisResult = JSON.parse(jsonMatch[0]);
      
      // Format the result to match our expected structure
      return {
        risk_score: analysisResult.risk_score || 0,
        risk_level: analysisResult.risk_level || 'low',
        categories: analysisResult.categories || ['safe'],
        recommendation: analysisResult.recommendation || 'approve',
        explanation: analysisResult.explanation || '',
        confidence: 0.9,
        detection_method: 'gemini-api'
      };
    } catch (jsonError) {
      console.error('Error parsing Gemini response:', jsonError);
      // If JSON parsing fails, extract information manually
      return this._extractAnalysisFromText(responseText);
    }
  }

  /**
   * Format policies for inclusion in the prompt
   * @param {Object} policies - Current moderation policies
   * @returns {string} Formatted policy string
   * @private
   */
  _formatPoliciesForPrompt(policies) {
    if (!policies || Object.keys(policies).length === 0) {
      return 'No specific policies defined. Use general content moderation guidelines.';
    }
    
    let policyString = '';
    
    if (policies.sensitiveCategories) {
      policyString += `Sensitive Categories: ${policies.sensitiveCategories.join(', ')}\n`;
    }
    
    if (policies.thresholds) {
      policyString += 'Thresholds:\n';
      for (const [key, value] of Object.entries(policies.thresholds)) {
        policyString += `- ${key}: ${value}\n`;
      }
    }
    
    if (policies.rules) {
      policyString += 'Rules:\n';
      policies.rules.forEach((rule, index) => {
        policyString += `- Rule ${index + 1}: ${rule}\n`;
      });
    }
    
    return policyString || 'Use standard content moderation guidelines.';
  }

  /**
   * Extract analysis information from text when JSON parsing fails
   * @param {string} text - The response text
   * @returns {Object} Extracted analysis
   * @private
   */
  _extractAnalysisFromText(text) {
    // Default values
    let result = {
      risk_score: 0,
      risk_level: 'low',
      categories: ['safe'],
      recommendation: 'approve',
      explanation: '',
      confidence: 0.7,
      detection_method: 'text-extraction'
    };
    
    // Extract risk level
    const riskLevelMatch = text.match(/risk level.*?(low|medium|high)/i);
    if (riskLevelMatch) {
      result.risk_level = riskLevelMatch[1].toLowerCase();
    }
    
    // Extract risk score
    const riskScoreMatch = text.match(/risk score.*?([0-9]\.[0-9]+)/i);
    if (riskScoreMatch) {
      result.risk_score = parseFloat(riskScoreMatch[1]);
    } else {
      // If no explicit score, derive from risk level
      if (result.risk_level === 'high') result.risk_score = 0.8;
      else if (result.risk_level === 'medium') result.risk_score = 0.5;
      else result.risk_score = 0.2;
    }
    
    // Extract categories
    const categoriesMatch = text.match(/categories.*?(harmful|profanity|sensitive|safe)/ig);
    if (categoriesMatch) {
      result.categories = categoriesMatch[0]
        .match(/(harmful|profanity|sensitive|safe)/ig)
        .map(cat => cat.toLowerCase());
    }
    
    // Extract recommendation
    const recommendationMatch = text.match(/recommendation.*?(approve|review|reject)/i);
    if (recommendationMatch) {
      result.recommendation = recommendationMatch[1].toLowerCase();
    }
    
    // Extract explanation
    const explanationMatch = text.match(/explanation.*?:(.+?)(?:\n\n|\n[0-9]|$)/is);
    if (explanationMatch) {
      result.explanation = explanationMatch[1].trim();
    }
    
    return result;
  }

  /**
   * Generate mock analysis for testing or when API fails
   * @param {string} content - The content to analyze
   * @param {string} contentType - The type of content
   * @returns {Object} Mock analysis results
   * @private
   */
  _mockAnalysis(content, contentType) {
    // Simple content analysis logic
    const contentLower = content.toLowerCase();

    // Check for potentially harmful content
    const harmfulWords = ['hate', 'kill', 'attack', 'bomb', 'threat', 'violence'];
    const profanityWords = ['damn', 'hell', 'ass', 'crap'];
    const sensitiveTopics = ['suicide', 'self-harm', 'terrorism', 'weapon'];

    const harmfulScore = harmfulWords.reduce((score, word) =>
      contentLower.includes(word) ? score + 0.2 : score, 0);

    const profanityScore = profanityWords.reduce((score, word) =>
      contentLower.includes(word) ? score + 0.1 : score, 0);

    const sensitiveScore = sensitiveTopics.reduce((score, word) =>
      contentLower.includes(word) ? score + 0.15 : score, 0);

    // Calculate overall risk score (0-1)
    const riskScore = Math.min(1, harmfulScore + profanityScore + sensitiveScore);

    // Determine risk level
    let riskLevel;
    if (riskScore >= 0.7) {
      riskLevel = 'high';
    } else if (riskScore >= 0.3) {
      riskLevel = 'medium';
    } else {
      riskLevel = 'low';
    }

    // Generate categories
    const categories = [];
    if (harmfulScore > 0) categories.push('harmful');
    if (profanityScore > 0) categories.push('profanity');
    if (sensitiveScore > 0) categories.push('sensitive');
    if (categories.length === 0) categories.push('safe');

    // Determine recommendation
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
      explanation: `Mock analysis for ${contentType} content.`,
      confidence: 0.85,
      detection_method: 'mock'
    };
  }
}

module.exports = {
  DetectionAgent
};
