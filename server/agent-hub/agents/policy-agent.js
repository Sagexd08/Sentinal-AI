/**
 * Policy Agent
 * 
 * Responsible for managing and updating content moderation policies.
 */

const fs = require('fs').promises;
const path = require('path');

class PolicyAgent {
  constructor() {
    this.policiesPath = path.join(__dirname, '../../config/moderation-policies.json');
    this.policies = null;
  }

  /**
   * Get current moderation policies
   * @returns {Promise<Object>} Current policies
   */
  async getCurrentPolicies() {
    if (this.policies) {
      return this.policies;
    }
    
    try {
      // Try to load policies from file
      const policyData = await fs.readFile(this.policiesPath, 'utf8');
      this.policies = JSON.parse(policyData);
    } catch (error) {
      console.warn('Could not load policies file, using defaults:', error.message);
      // Use default policies if file doesn't exist or has errors
      this.policies = this._getDefaultPolicies();
      
      // Create the policies file with defaults
      try {
        await this._savePolicies();
      } catch (saveError) {
        console.error('Failed to save default policies:', saveError);
      }
    }
    
    return this.policies;
  }

  /**
   * Process user feedback to potentially update policies
   * @param {Object} feedback - The user feedback
   * @returns {Promise<Object>} Policy update results
   */
  async processFeedback(feedback) {
    // Ensure policies are loaded
    await this.getCurrentPolicies();
    
    // Check if feedback contains policy-related information
    if (!feedback.content || !feedback.feedbackType) {
      return { updated: false, message: 'No policy-relevant feedback' };
    }
    
    // Only process policy feedback
    if (feedback.feedbackType !== 'policy' && feedback.feedbackType !== 'moderation') {
      return { updated: false, message: 'Feedback not related to policies' };
    }
    
    // Track if we made any changes
    let policyUpdated = false;
    
    // Process feedback content for potential policy updates
    if (feedback.content.toLowerCase().includes('false positive')) {
      // Reduce sensitivity for the category if mentioned
      if (feedback.metadata && feedback.metadata.category) {
        const category = feedback.metadata.category;
        
        // Adjust threshold for this category
        if (this.policies.thresholds && this.policies.thresholds[category]) {
          this.policies.thresholds[category] += 0.05; // Increase threshold (less sensitive)
          this.policies.thresholds[category] = Math.min(this.policies.thresholds[category], 0.9);
          policyUpdated = true;
        }
      }
    }
    
    if (feedback.content.toLowerCase().includes('false negative')) {
      // Increase sensitivity for the category if mentioned
      if (feedback.metadata && feedback.metadata.category) {
        const category = feedback.metadata.category;
        
        // Adjust threshold for this category
        if (this.policies.thresholds && this.policies.thresholds[category]) {
          this.policies.thresholds[category] -= 0.05; // Decrease threshold (more sensitive)
          this.policies.thresholds[category] = Math.max(this.policies.thresholds[category], 0.1);
          policyUpdated = true;
        }
      }
    }
    
    // If we made changes, save the updated policies
    if (policyUpdated) {
      await this._savePolicies();
      return { 
        updated: true, 
        message: 'Policies updated based on feedback',
        policies: this.policies
      };
    }
    
    return { updated: false, message: 'No policy updates needed' };
  }

  /**
   * Update policies based on analytics data
   * @param {Object} analytics - Analytics data
   * @returns {Promise<Object>} Policy update results
   */
  async updatePolicies(analytics) {
    // Ensure policies are loaded
    await this.getCurrentPolicies();
    
    // Track if we made any changes
    let policyUpdated = false;
    const updates = [];
    
    // Only update if we have sufficient data
    if (!analytics || analytics.total_analyzed < 50) {
      return { 
        updated: false, 
        message: 'Insufficient data for policy updates',
        min_required: 50,
        current: analytics ? analytics.total_analyzed : 0
      };
    }
    
    // Adjust for false positives
    if (analytics.false_positive_rate > 0.2) {
      // Too many false positives, reduce sensitivity
      Object.keys(this.policies.thresholds).forEach(category => {
        const oldValue = this.policies.thresholds[category];
        this.policies.thresholds[category] += 0.05;
        this.policies.thresholds[category] = Math.min(this.policies.thresholds[category], 0.9);
        
        if (oldValue !== this.policies.thresholds[category]) {
          updates.push({
            type: 'threshold_increase',
            category,
            old_value: oldValue,
            new_value: this.policies.thresholds[category],
            reason: 'High false positive rate'
          });
          policyUpdated = true;
        }
      });
    }
    
    // Adjust for false negatives
    if (analytics.false_negative_rate > 0.2) {
      // Too many false negatives, increase sensitivity
      Object.keys(this.policies.thresholds).forEach(category => {
        const oldValue = this.policies.thresholds[category];
        this.policies.thresholds[category] -= 0.05;
        this.policies.thresholds[category] = Math.max(this.policies.thresholds[category], 0.1);
        
        if (oldValue !== this.policies.thresholds[category]) {
          updates.push({
            type: 'threshold_decrease',
            category,
            old_value: oldValue,
            new_value: this.policies.thresholds[category],
            reason: 'High false negative rate'
          });
          policyUpdated = true;
        }
      });
    }
    
    // Adjust category-specific thresholds based on frequency
    if (analytics.category_frequency) {
      Object.entries(analytics.category_frequency).forEach(([category, frequency]) => {
        // If a category is very frequent but not in our sensitive categories, add it
        if (frequency > analytics.total_analyzed * 0.3 && 
            !this.policies.sensitiveCategories.includes(category)) {
          this.policies.sensitiveCategories.push(category);
          updates.push({
            type: 'category_added',
            category,
            reason: 'High frequency in flagged content'
          });
          policyUpdated = true;
        }
      });
    }
    
    // If we made changes, save the updated policies
    if (policyUpdated) {
      await this._savePolicies();
      return { 
        updated: true, 
        message: 'Policies updated based on analytics',
        updates,
        policies: this.policies
      };
    }
    
    return { updated: false, message: 'No policy updates needed' };
  }

  /**
   * Save current policies to file
   * @returns {Promise<void>}
   * @private
   */
  async _savePolicies() {
    try {
      // Ensure the directory exists
      const dir = path.dirname(this.policiesPath);
      await fs.mkdir(dir, { recursive: true });
      
      // Write policies to file
      await fs.writeFile(
        this.policiesPath,
        JSON.stringify(this.policies, null, 2),
        'utf8'
      );
    } catch (error) {
      console.error('Failed to save policies:', error);
      throw new Error(`Failed to save policies: ${error.message}`);
    }
  }

  /**
   * Get default moderation policies
   * @returns {Object} Default policies
   * @private
   */
  _getDefaultPolicies() {
    return {
      version: '1.0',
      updated_at: new Date().toISOString(),
      sensitiveCategories: [
        'harmful',
        'profanity',
        'sensitive',
        'hate_speech',
        'violence',
        'sexual',
        'harassment'
      ],
      thresholds: {
        harmful: 0.5,
        profanity: 0.6,
        sensitive: 0.5,
        hate_speech: 0.4,
        violence: 0.5,
        sexual: 0.5,
        harassment: 0.5
      },
      rules: [
        'Content with a risk score above 0.7 should be rejected',
        'Content with a risk score between 0.3 and 0.7 should be reviewed',
        'Content with a risk score below 0.3 can be approved automatically',
        'Any content explicitly mentioning self-harm should be escalated',
        'Profanity in educational contexts may be acceptable'
      ]
    };
  }
}

module.exports = {
  PolicyAgent
};
