import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool, memoryDb } from '../config/db.js';
import { config } from '../config/env.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    let user = null;
    if (pool) {
      const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email.trim().toLowerCase()]);
      user = userRes.rows[0];
    } else {
      user = memoryDb.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Always secure since we use cross-origin (HTTPS only)
      sameSite: 'none', // Required for cross-origin cookie support (Vercel → Railway)
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      user: { email: user.email },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function logout(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}

export async function getCurrentUser(req, res) {
  return res.status(200).json({
    authenticated: true,
    user: { email: req.user.email }
  });
}
