import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/env.js';
import { initDb } from './config/db.js';
import emailRoutes from './routes/emailRoutes.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security & Middleware — Locked CORS configuration
const configuredOrigins = config.allowedOrigin
  ? config.allowedOrigin.split(',').map(o => o.trim().replace(/\/$/, '')).filter(Boolean)
  : [];

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  ...configuredOrigins
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, curl, Vercel reverse-proxy) or matching allowed origins
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      (process.env.NODE_ENV !== 'production' && origin.startsWith('http://localhost:'))
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static public assets
app.use(express.static(path.resolve(__dirname, '../public')));

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
app.use('/api', authRoutes);
app.use('/api', projectRoutes);

// 404 handler — return JSON, never HTML
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

// Global error handler — MUST be last, 4 args signature required by Express
// Ensures Express NEVER returns HTML error pages in production
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  console.error(`[ERROR] ${req.method} ${req.originalUrl} →`, err.message || err);
  res.status(status).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (err.message || 'Unknown error'),
  });
});

// Start Server and Initialize DB
app.listen(config.port, async () => {
  console.log(`🚀 DS-Graphix Backend Server running on http://localhost:${config.port}`);
  console.log(`📧 Resend Email Service initialized with domain: dsgraphix.in`);
  await initDb();
});
