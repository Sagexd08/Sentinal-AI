const { initAgentHub } = require('../agent-hub');

// Mock the agents
jest.mock('../agent-hub/agents/detection-agent', () => ({
  DetectionAgent: jest.fn().mockImplementation(() => ({
    analyzeContent: jest.fn().mockResolvedValue({
      risk_score: 0.2,
      risk_level: 'low',
      categories: ['safe'],
      recommendation: 'approve',
      explanation: 'Test explanation',
      confidence: 0.9
    })
  }))
}));

jest.mock('../agent-hub/agents/database-agent', () => ({
  DatabaseAgent: jest.fn().mockImplementation(() => ({
    storeAnalysisResult: jest.fn().mockResolvedValue({ success: true }),
    storeFeedback: jest.fn().mockResolvedValue({ success: true }),
    getModeratorAnalytics: jest.fn().mockResolvedValue({
      status_counts: { pending: 10, approved: 20, rejected: 5 },
      false_positive_rate: 0.1,
      false_negative_rate: 0.05,
      total_analyzed: 100
    })
  }))
}));

jest.mock('../agent-hub/agents/policy-agent', () => ({
  PolicyAgent: jest.fn().mockImplementation(() => ({
    getCurrentPolicies: jest.fn().mockResolvedValue({
      sensitiveCategories: ['harmful', 'profanity'],
      thresholds: { harmful: 0.5, profanity: 0.6 }
    }),
    processFeedback: jest.fn().mockResolvedValue({ updated: false }),
    updatePolicies: jest.fn().mockResolvedValue({ updated: true })
  }))
}));

// Mock LangChain components
jest.mock('@langchain/core/runnables', () => ({
  RunnableSequence: {
    from: jest.fn().mockReturnValue({
      invoke: jest.fn().mockResolvedValue({
        risk_score: 0.3,
        risk_level: 'medium',
        categories: ['sensitive'],
        recommendation: 'review',
        explanation: 'LLM explanation'
      })
    })
  }
}));

describe('Agent Hub', () => {
  let agentHub;

  beforeEach(() => {
    agentHub = initAgentHub();
  });

  describe('analyzeContent', () => {
    it('should analyze content successfully', async () => {
      const result = await agentHub.analyzeContent('Test content', 'text');
      
      expect(result).toHaveProperty('risk_score');
      expect(result).toHaveProperty('risk_level');
      expect(result).toHaveProperty('categories');
      expect(result).toHaveProperty('recommendation');
      expect(result).toHaveProperty('analysis_timestamp');
    });

    it('should handle different content types', async () => {
      const result = await agentHub.analyzeContent('Test image', 'image');
      
      expect(result).toHaveProperty('content_type', 'image');
    });
  });

  describe('processFeedback', () => {
    it('should process feedback successfully', async () => {
      const feedback = {
        content: 'This is test feedback',
        feedbackType: 'general',
        rating: 4
      };
      
      const result = await agentHub.processFeedback(feedback);
      
      expect(result).toHaveProperty('status', 'success');
      expect(result).toHaveProperty('message');
    });
  });

  describe('updatePolicies', () => {
    it('should update policies successfully', async () => {
      const result = await agentHub.updatePolicies();
      
      expect(result).toHaveProperty('status', 'success');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('updates');
    });
  });
});
