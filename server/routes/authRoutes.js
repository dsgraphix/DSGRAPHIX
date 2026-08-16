import express from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, getCurrentUser } from '../controllers/authController.js';
import { verifyAuth } from '../middleware/auth.js';

const router = express.Router();

// Rate limiting for admin login to prevent brute force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts allowed per 15 mins window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' }
});

router.post('/admin/login', loginLimiter, login);
router.post('/admin/logout', logout);
router.get('/admin/me', verifyAuth, getCurrentUser);

export default router;
