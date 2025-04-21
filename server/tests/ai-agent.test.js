const { analyzeContent } = require('../utils/ai-agent');

describe('AI Agent', () => {
  describe('analyzeContent', () => {
    it('should analyze safe content correctly', async () => {
      const content = 'This is a perfectly safe and normal content.';
      const result = await analyzeContent(content, 'text');
      
      expect(result).toHaveProperty('risk_score');
      expect(result).toHaveProperty('risk_level');
      expect(result).toHaveProperty('categories');
      expect(result).toHaveProperty('recommendation');
      
      expect(result.risk_score).toBeLessThan(0.3);
      expect(result.risk_level).toBe('low');
      expect(result.categories).toContain('safe');
      expect(result.recommendation).toBe('approve');
    });
    
    it('should detect harmful content', async () => {
      const content = 'I hate you and want to kill everyone.';
      const result = await analyzeContent(content, 'text');
      
      expect(result.risk_score).toBeGreaterThan(0.3);
      expect(['medium', 'high']).toContain(result.risk_level);
      expect(result.categories).toContain('harmful');
      expect(result.recommendation).toBe('review');
    });
    
    it('should detect profanity', async () => {
      const content = 'This is a damn hell of a mess.';
      const result = await analyzeContent(content, 'text');
      
      expect(result.categories).toContain('profanity');
    });
    
    it('should detect sensitive topics', async () => {
      const content = 'Information about suicide and self-harm methods.';
      const result = await analyzeContent(content, 'text');
      
      expect(result.categories).toContain('sensitive');
      expect(result.risk_score).toBeGreaterThan(0.1);
    });
    
    it('should handle different content types', async () => {
      const result = await analyzeContent('image data', 'image');
      
      expect(result).toHaveProperty('content_type', 'image');
    });
  });
});
