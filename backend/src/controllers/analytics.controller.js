const { supabaseAdmin } = require('../utils/supabase');

/**
 * Get dashboard analytics data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Initialize the agent hub
    const { initAgentHub } = require('../agents/agent-hub');
    const agentHub = initAgentHub();

    // Get analytics data from the agent hub
    const analyticsData = await agentHub.getModeratorAnalytics(userId);

    // Get recent analyses for the dashboard
    const { data: recentAnalyses, error: recentError } = await supabaseAdmin
      .from('content_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('analysis_timestamp', { ascending: false })
      .limit(5);

    if (recentError) {
      console.error('Error getting recent analyses:', recentError);
    }

    return res.status(200).json({
      success: true,
      dashboard: {
        total_analyses: analyticsData.total_analyzed || 0,
        risk_distribution: {
          high: analyticsData.status_counts.reject || 0,
          medium: analyticsData.status_counts.review || 0,
          low: analyticsData.status_counts.approve || 0
        },
        recent_analyses: recentAnalyses || [],
        false_positive_rate: analyticsData.false_positive_rate,
        false_negative_rate: analyticsData.false_negative_rate
      }
    });
  } catch (error) {
    console.error('Get dashboard data error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching dashboard data'
    });
  }
};

/**
 * Get threat analytics data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getThreatAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { timeframe = '30d' } = req.query;

    // Calculate date range based on timeframe
    const now = new Date();
    let startDate;

    switch (timeframe) {
      case '7d':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case '30d':
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case '90d':
        startDate = new Date(now.setDate(now.getDate() - 90));
        break;
      case '1y':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 30));
    }

    // Get threat data within timeframe
    const { data, error } = await supabaseAdmin
      .from('content_analyses')
      .select('*')
      .eq('user_id', userId)
      .gte('analysis_timestamp', startDate.toISOString())
      .order('analysis_timestamp', { ascending: true });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Process data for visualization
    const threatsByDay = data.reduce((acc, item) => {
      const date = new Date(item.analysis_timestamp).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { total: 0, high: 0, medium: 0, low: 0 };
      }

      acc[date].total += 1;

      if (item.risk_level === 'high') {
        acc[date].high += 1;
      } else if (item.risk_level === 'medium') {
        acc[date].medium += 1;
      } else if (item.risk_level === 'low') {
        acc[date].low += 1;
      }

      return acc;
    }, {});

    // Convert to array format for charts
    const threatTrends = Object.keys(threatsByDay).map(date => ({
      date,
      ...threatsByDay[date]
    }));

    // Get category distribution
    const categoryDistribution = data.reduce((acc, item) => {
      if (item.categories && Array.isArray(item.categories)) {
        item.categories.forEach(category => {
          acc[category] = (acc[category] || 0) + 1;
        });
      }
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      threat_analytics: {
        threat_trends: threatTrends,
        category_distribution: categoryDistribution,
        timeframe
      }
    });
  } catch (error) {
    console.error('Get threat analytics error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching threat analytics'
    });
  }
};

/**
 * Get system performance metrics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getPerformanceMetrics = async (req, res) => {
  try {
    // For demonstration purposes, we'll return mock performance data
    // In a real system, this would be collected from monitoring tools

    const performanceMetrics = {
      api_response_time: {
        avg_ms: 120,
        p95_ms: 250,
        p99_ms: 450
      },
      analysis_time: {
        avg_ms: 850,
        p95_ms: 1200,
        p99_ms: 1800
      },
      system_health: {
        cpu_usage: 35,
        memory_usage: 42,
        disk_usage: 28
      },
      uptime: {
        days: 15,
        hours: 7,
        minutes: 23
      }
    };

    return res.status(200).json({
      success: true,
      performance_metrics: performanceMetrics
    });
  } catch (error) {
    console.error('Get performance metrics error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching performance metrics'
    });
  }
};

/**
 * Get custom analytics reports
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getCustomReports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { report_type, start_date, end_date } = req.query;

    if (!report_type) {
      return res.status(400).json({
        success: false,
        message: 'Report type is required'
      });
    }

    let reportData = {};

    switch (report_type) {
      case 'risk_summary':
        // Get risk summary data
        const { data: riskData, error: riskError } = await supabaseAdmin
          .from('content_analyses')
          .select('*')
          .eq('user_id', userId)
          .gte('analysis_timestamp', start_date || '1900-01-01')
          .lte('analysis_timestamp', end_date || new Date().toISOString());

        if (riskError) {
          return res.status(400).json({
            success: false,
            message: riskError.message
          });
        }

        // Process risk summary data
        const totalAnalyses = riskData.length;
        const riskLevels = riskData.reduce((acc, item) => {
          acc[item.risk_level] = (acc[item.risk_level] || 0) + 1;
          return acc;
        }, {});

        reportData = {
          total_analyses: totalAnalyses,
          risk_levels,
          high_risk_percentage: totalAnalyses > 0 ? ((riskLevels.high || 0) / totalAnalyses) * 100 : 0,
          medium_risk_percentage: totalAnalyses > 0 ? ((riskLevels.medium || 0) / totalAnalyses) * 100 : 0,
          low_risk_percentage: totalAnalyses > 0 ? ((riskLevels.low || 0) / totalAnalyses) * 100 : 0
        };
        break;

      case 'category_analysis':
        // Get category analysis data
        const { data: categoryData, error: categoryError } = await supabaseAdmin
          .from('content_analyses')
          .select('*')
          .eq('user_id', userId)
          .gte('analysis_timestamp', start_date || '1900-01-01')
          .lte('analysis_timestamp', end_date || new Date().toISOString());

        if (categoryError) {
          return res.status(400).json({
            success: false,
            message: categoryError.message
          });
        }

        // Process category data
        const categoryDistribution = categoryData.reduce((acc, item) => {
          if (item.categories && Array.isArray(item.categories)) {
            item.categories.forEach(category => {
              acc[category] = (acc[category] || 0) + 1;
            });
          }
          return acc;
        }, {});

        reportData = {
          category_distribution: categoryDistribution,
          top_categories: Object.entries(categoryDistribution)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([category, count]) => ({ category, count }))
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    return res.status(200).json({
      success: true,
      report: {
        type: report_type,
        start_date: start_date || 'all time',
        end_date: end_date || 'present',
        data: reportData
      }
    });
  } catch (error) {
    console.error('Get custom reports error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while generating custom reports'
    });
  }
};
