require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Import routes
const flagRoutes = require('./routes/flag.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const policyRoutes = require('./routes/policy.routes');
const authRoutes = require('./routes/auth.routes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Configure Winston logger
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? '*' : 'https://sentinal-ai.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Routes
app.use('/flag', flagRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/policy', policyRoutes);
app.use('/auth', authRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing
