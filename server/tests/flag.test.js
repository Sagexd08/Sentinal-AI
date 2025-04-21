const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');

// Mock Supabase client
jest.mock('../config/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis()
  }
}));

// Mock AI agent
jest.mock('../utils/ai-agent', () => ({
  analyzeContent: jest.fn().mockResolvedValue({
    risk_score: 0.2,
    risk_level: 'low',
    categories: ['safe'],
    recommendation: 'approve'
  })
}));

describe('Flag API Endpoints', () => {
  let token;
  
  beforeAll(() => {
    // Create a test token
    token = jwt.sign({ id: 'test-user-id', role: 'user' }, process.env.JWT_SECRET || 'test-secret');
  });
  
  describe('POST /flag', () => {
    it('should create a new flag', async () => {
      const mockResponse = {
        data: [{
          id: 'test-flag-id',
          content: 'Test content',
          content_type: 'text',
          status: 'pending'
        }],
        error: null
      };
      
      require('../config/supabase').supabaseAdmin.insert.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .post('/flag')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Test content',
          contentType: 'text',
          reason: 'inappropriate'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Content flagged successfully');
      expect(res.body).toHaveProperty('flag');
    });
    
    it('should return 400 if content is missing', async () => {
      const res = await request(app)
        .post('/flag')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentType: 'text',
          reason: 'inappropriate'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Content is required');
    });
  });
  
  describe('GET /flags', () => {
    it('should get all flags', async () => {
      const mockResponse = {
        data: [
          {
            id: 'test-flag-id-1',
            content: 'Test content 1',
            status: 'pending'
          },
          {
            id: 'test-flag-id-2',
            content: 'Test content 2',
            status: 'approved'
          }
        ],
        error: null,
        count: 2
      };
      
      require('../config/supabase').supabaseAdmin.select.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .get('/flag')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('flags');
      expect(res.body.flags).toHaveLength(2);
    });
  });
  
  describe('GET /flag/:id', () => {
    it('should get a flag by ID', async () => {
      const mockResponse = {
        data: {
          id: 'test-flag-id',
          content: 'Test content',
          status: 'pending'
        },
        error: null
      };
      
      require('../config/supabase').supabaseAdmin.single.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .get('/flag/test-flag-id')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('flag');
      expect(res.body.flag.id).toEqual('test-flag-id');
    });
    
    it('should return 404 if flag not found', async () => {
      const mockResponse = {
        data: null,
        error: null
      };
      
      require('../config/supabase').supabaseAdmin.single.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .get('/flag/non-existent-id')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Flagged content not found');
    });
  });
  
  describe('PUT /flag/:id', () => {
    it('should update flag status', async () => {
      const mockResponse = {
        data: [{
          id: 'test-flag-id',
          content: 'Test content',
          status: 'approved'
        }],
        error: null
      };
      
      require('../config/supabase').supabaseAdmin.select.mockResolvedValueOnce(mockResponse);
      
      const res = await request(app)
        .put('/flag/test-flag-id')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'approved',
          moderator_notes: 'Approved after review'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Flag status updated successfully');
      expect(res.body.flag.status).toEqual('approved');
    });
    
    it('should return 400 if status is invalid', async () => {
      const res = await request(app)
        .put('/flag/test-flag-id')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'invalid-status'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid status');
    });
  });
});
