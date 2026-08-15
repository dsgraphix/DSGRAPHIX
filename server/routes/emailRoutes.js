import { Router } from 'express';
import { handleSendEmail } from '../controllers/emailController.js';

const router = Router();

// POST /api/send-email
router.post('/send-email', handleSendEmail);

export default router;
