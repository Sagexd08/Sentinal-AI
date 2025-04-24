const jwt = require('jsonwebtoken');
const { supabaseAdmin } = require('../utils/supabase');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, password, and name are required' 
      });
    }

    // Register user with Supabase
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name }
    });

    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }

    // Create profile in profiles table
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: data.user.id,
        name,
        email,
        created_at: new Date()
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // Continue anyway as the user was created
    }

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration'
    });
  }
};

/**
 * Login user and return JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Authenticate with Supabase
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Get user profile
    const { data: profileData } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    // Create JWT token
    const token = jwt.sign(
      { 
        id: data.user.id, 
        email: data.user.email,
        role: data.user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profileData?.name || data.user.user_metadata?.name || '',
        role: data.user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login'
    });
  }
};

/**
 * Get user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getProfile = async (req, res) => {
  try {
    // User ID will be available from auth middleware
    const userId = req.user.id;

    // Get user profile from Supabase
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    return res.status(200).json({
      success: true,
      profile: data
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching profile'
    });
  }
};

/**
 * Update user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateProfile = async (req, res) => {
  try {
    // User ID will be available from auth middleware
    const userId = req.user.id;
    const { name, avatar_url, bio } = req.body;

    // Update profile in Supabase
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        name,
        avatar_url,
        bio,
        updated_at: new Date()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile: data
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating profile'
    });
  }
};
