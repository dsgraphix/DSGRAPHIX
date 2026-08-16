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
};

// Critical env var validation — crash fast in production if secrets are missing
if (!config.resendApiKey) {
  console.warn('⚠️  WARNING: RESEND_API_KEY is not defined. Email sending will fail.');
}
if (!config.databaseUrl) {
  console.warn('⚠️  WARNING: DATABASE_URL is not defined. Using in-memory fallback (dev only).');
}
if (!config.jwtSecret) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ FATAL: JWT_SECRET must be set in production environment. Exiting.');
    process.exit(1);
  }
  // Dev fallback only — never used in production
  config.jwtSecret = 'dev_only_insecure_jwt_secret';
  console.warn('⚠️  WARNING: JWT_SECRET not set. Using dev-only fallback — NOT safe for production.');
}
if (!config.adminPassword) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ FATAL: ADMIN_PASSWORD must be set in production environment. Exiting.');
    process.exit(1);
  }
  config.adminPassword = 'dev_only_password_123';
  console.warn('⚠️  WARNING: ADMIN_PASSWORD not set. Using dev-only fallback.');
}
