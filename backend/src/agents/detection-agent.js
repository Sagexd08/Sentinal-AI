/**
 * Detection Agent
 * Responsible for analyzing content and detecting potential security threats
 */
class DetectionAgent {
  constructor() {
    this.name = 'Detection Agent';
    this.version = '1.0.0';
    this.sensitiveKeywords = [
      'password', 'credit card', 'social security', 'private', 'confidential',
      'secret', 'hack', 'exploit', 'vulnerability', 'attack', 'malware', 'virus'
    ];
    this.moderateKeywords = [
      'personal', 'address', 'phone', 'email', 'account', 'login',
      'username', 'payment', 'financial', 'secure', 'protected'
    ];
  }

  /**
   * Analyze content for security threats
   * @param {string} content - The content to analyze
   * @param {string} contentType - The type of content (text, image, etc.)
   * @returns {Object} Analysis result
   */
  async analyzeContent(content, contentType = 'text') {
    console.log(`${this.name} analyzing ${contentType} content...`);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // For text content, perform keyword analysis
    if (contentType === 'text') {
      return this.analyzeTextContent(content);
    }
    
    // For image content, return a placeholder result
    // In a real system, this would use image recognition AI
    if (contentType === 'image') {
      return {
        risk_score: 0.3,
        risk_level: 'medium',
        categories: ['image', 'potentially_sensitive'],
        recommendation: 'review',
        explanation: 'Image content requires manual review.',
        confidence: 0.7,
        content_type: contentType
      };
    }
    
    // Default response for other content types
    return {
      risk_score: 0.1,
      risk_level: 'low',
      categories: ['unknown'],
      recommendation: 'review',
      explanation: `Unknown content type: ${contentType}`,
      confidence: 0.5,
      content_type: contentType
    };
  }
  
  /**
   * Analyze text content
   * @param {string} content - The text content to analyze
   * @returns {Object} Analysis result
   */
  analyzeTextContent(content) {
    // Count occurrences of sensitive and moderate keywords
    const sensitiveCount = this.countKeywords(content, this.sensitiveKeywords);
    const moderateCount = this.countKeywords(content, this.moderateKeywords);
    
    // Determine risk level and score based on keyword counts
    let riskScore = 0;
    let riskLevel = 'low';
    let recommendation = 'approve';
    let categories = ['safe'];
    
    if (sensitiveCount > 2) {
      riskScore = 0.8;
      riskLevel = 'high';
      recommendation = 'reject';
      categories = ['sensitive', 'confidential'];
    } else if (sensitiveCount > 0 || moderateCount > 2) {
      riskScore = 0.5;
      riskLevel = 'medium';
      recommendation = 'review';
      categories = ['potentially_sensitive'];
    }
    
    // Generate explanation
    let explanation = `Content analysis detected ${sensitiveCount} sensitive keywords and ${moderateCount} moderate keywords.`;
    
    if (riskLevel === 'high') {
      explanation += ' The content contains multiple sensitive terms that may expose confidential information.';
    } else if (riskLevel === 'medium') {
      explanation += ' The content contains some potentially sensitive information that should be reviewed.';
    } else {
      explanation += ' The content appears to be safe with no significant sensitive information detected.';
    }
    
    return {
      risk_score: riskScore,
      risk_level: riskLevel,
      categories,
      recommendation,
      explanation,
      confidence: 0.85,
      content_type: 'text'
    };
  }
  
  /**
   * Count occurrences of keywords in content
   * @param {string} content - The content to analyze
   * @param {Array<string>} keywords - List of keywords to count
   * @returns {number} Number of keyword occurrences
   */
  countKeywords(content, keywords) {
    if (typeof content !== 'string') {
      return 0;
    }
    
    const contentLower = content.toLowerCase();
    let count = 0;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = contentLower.match(regex);
      if (matches) {
        count += matches.length;
      }
    });
    
    return count;
  }
}

module.exports = { DetectionAgent };
