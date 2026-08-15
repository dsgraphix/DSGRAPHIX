import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import emailRoutes from './routes/emailRoutes.js';

const app = express();

// Security & Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'DS-Graphix Backend API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', emailRoutes);

// Start Server
app.listen(config.port, () => {
  console.log(`🚀 DS-Graphix Backend Server running on http://localhost:${config.port}`);
  console.log(`📧 Resend Email Service initialized with domain: dsgraphix.in`);
});
