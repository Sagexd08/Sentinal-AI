const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');

// Mock Supabase client
jest.mock('../config/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis()
  }
}));

describe('Feedback API Endpoints', () => {
  let token;
  
  beforeAll(() => {
    // Create a test token
    token = jwt.sign({ id: 'test-user-id', role: 'user' }, process.env.JWT_SECRET || 'test-secret');
  });
  
  describe('POST /feedback', () => {
    it('should submit new feedback', async () => {
      const mockResponse = {
        data: [{
          id: 'test-feedback-id',
          content: 'Test feedback',
          feedback_type: 'general',
          rating: 4
        }],
        error: null
      };
      
      require('../config/supabase').supabaseAdmin.insert.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .post('/feedback')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Test feedback',
          feedbackType: 'general',
          rating: 4
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Feedback submitted successfully');
      expect(res.body).toHaveProperty('feedback');
    });
    
    it('should return 400 if content is missing', async () => {
      const res = await request(app)
        .post('/feedback')
        .set('Authorization', `Bearer ${token}`)
        .send({
          feedbackType: 'general',
          rating: 4
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Feedback content is required');
    });
  });
  
  describe('GET /feedback', () => {
    it('should get all feedback', async () => {
      const mockResponse = {
        data: [
          {
            id: 'test-feedback-id-1',
            content: 'Test feedback 1',
            feedback_type: 'general'
          },
          {
            id: 'test-feedback-id-2',
            content: 'Test feedback 2',
            feedback_type: 'bug'
          }
        ],
        error: null,
        count: 2
      };
      
      require('../config/supabase').supabaseAdmin.select.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .get('/feedback')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('feedback');
      expect(res.body.feedback).toHaveLength(2);
    });
    
    it('should filter feedback by type', async () => {
      const mockResponse = {
        data: [
          {
            id: 'test-feedback-id-2',
            content: 'Test feedback 2',
            feedback_type: 'bug'
          }
        ],
        error: null,
        count: 1
      };
      
      require('../config/supabase').supabaseAdmin.select.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .get('/feedback?feedbackType=bug')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('feedback');
      expect(res.body.feedback).toHaveLength(1);
      expect(res.body.feedback[0].feedback_type).toEqual('bug');
    });
  });
  
  describe('GET /feedback/:id', () => {
    it('should get feedback by ID', async () => {
      const mockResponse = {
        data: {
          id: 'test-feedback-id',
          content: 'Test feedback',
          feedback_type: 'general'
        },
        error: null
      };
      
      require('../config/supabase').supabaseAdmin.single.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .get('/feedback/test-feedback-id')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('feedback');
      expect(res.body.feedback.id).toEqual('test-feedback-id');
    });
    
    it('should return 404 if feedback not found', async () => {
      const mockResponse = {
        data: null,
        error: null
      };
      
      require('../config/supabase').supabaseAdmin.single.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .get('/feedback/non-existent-id')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Feedback not found');
    });
  });
});
