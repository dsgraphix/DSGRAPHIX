import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables strictly from server/.env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  port: process.env.PORT || 5000,
  resendApiKey: process.env.RESEND_API_KEY || 're_JFqrtuwr_G8xWRztD9W9Z76wHFF2bAtPx',
  fromEmail: process.env.FROM_EMAIL || 'DS-Graphix <hello@dsgraphix.in>',
  toEmail: process.env.TO_EMAIL || 'hello@dsgraphix.in',
};

if (!config.resendApiKey) {
  console.warn('⚠️ WARNING: RESEND_API_KEY is not defined in backend environment!');
}
