import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export function verifyAuth(req, res, next) {
  let token = req.cookies?.token;

  // Also check Authorization header
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized access',
      message: 'No active admin session found'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Unauthorized access',
      message: 'Session invalid or expired'
    });
  }
}
