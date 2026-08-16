import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables strictly from server/.env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  port: process.env.PORT || 5000,
  resendApiKey: process.env.RESEND_API_KEY || '',
  fromEmail: process.env.FROM_EMAIL || 'DS-Graphix <hello@dsgraphix.in>',
  toEmail: process.env.TO_EMAIL || 'hello@dsgraphix.in',
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || '',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@dsgraphix.in',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
  allowedOrigin: process.env.ALLOWED_ORIGIN || '',
};

// Critical env var validation — warn loudly but never crash the server
// (crashing causes Railway to enter SIGTERM restart loops)
if (!config.resendApiKey) {
  console.warn('⚠️  WARNING: RESEND_API_KEY is not defined. Email sending will fail.');
}
if (!config.databaseUrl) {
  console.warn('⚠️  WARNING: DATABASE_URL is not defined. Using in-memory fallback (dev only).');
}
if (!config.jwtSecret) {
  // Generate a stable random secret so auth works even without env var
  // NOTE: This means tokens reset on every server restart — set JWT_SECRET in Railway for persistence
  const fallback = `auto_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  config.jwtSecret = fallback;
  console.warn('⚠️  WARNING: JWT_SECRET not set. Using auto-generated ephemeral secret. Set JWT_SECRET in Railway env vars for persistent sessions.');
}
if (!config.adminPassword) {
  config.adminPassword = 'ChangeMe_SetADMIN_PASSWORD_InRailway!';
  console.warn('⚠️  WARNING: ADMIN_PASSWORD not set. Using insecure placeholder. Set ADMIN_PASSWORD in Railway env vars immediately.');
}
