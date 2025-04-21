/**
 * API Service for Sentinal AI
 * 
 * This module provides functions to interact with the Sentinal AI backend API.
 */

// Base API URL - defaults to localhost in development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to get error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    } catch (e) {
      throw new Error(`API error: ${response.status}`);
    }
  }
  return response.json();
};

// Get JWT token from local storage (client-side only)
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('sentinal_token');
  }
  return null;
};

// API service object
const api = {
  /**
   * Flag content for moderation
   * @param content The content to flag
   * @param contentType The type of content (text, image, etc.)
   * @param metadata Additional metadata
   */
  flagContent: async (content: string, contentType = 'text', metadata = {}) => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/flag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        content,
        contentType,
        metadata
      })
    });

    return handleResponse(response);
  },

  /**
   * Get moderation queue
   * @param status Filter by status (optional)
   * @param limit Number of results to return (default: 50)
   * @param offset Pagination offset (default: 0)
   */
  getFlags: async (status?: string, limit = 50, offset = 0) => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    let url = `${API_URL}/flag?limit=${limit}&offset=${offset}`;
    if (status) url += `&status=${status}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return handleResponse(response);
  },

  /**
   * Update flag status
   * @param id Flag ID
   * @param status New status
   * @param moderatorNotes Optional moderator notes
   */
  updateFlagStatus: async (id: string, status: string, moderatorNotes?: string) => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/flag/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        status,
        moderator_notes: moderatorNotes
      })
    });

    return handleResponse(response);
  },

  /**
   * Submit user feedback
   * @param content Feedback content
   * @param feedbackType Type of feedback
   * @param rating Optional rating (1-5)
   * @param metadata Additional metadata
   */
  submitFeedback: async (content: string, feedbackType = 'general', rating?: number, metadata = {}) => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        content,
        feedbackType,
        rating,
        metadata
      })
    });

    return handleResponse(response);
  },

  /**
   * Get current moderation policies
   */
  getPolicies: async () => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/policy`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return handleResponse(response);
  },

  /**
   * Trigger policy update (moderator only)
   */
  updatePolicies: async () => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/policy/update`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return handleResponse(response);
  },

  /**
   * Generate a test JWT token (for development only)
   */
  getTestToken: async () => {
    const response = await fetch(`${API_URL}/auth/test-token`, {
      method: 'POST'
    });

    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('sentinal_token', data.token);
    }
    return data;
  }
};

export default api;
