import { config } from '../config/env.js';

export async function sendEmail({ subject, html, replyTo, to }) {
  const recipient = to || config.toEmail;
  const payload = {
    from: config.fromEmail,
    to: Array.isArray(recipient) ? recipient : [recipient],
    subject,
    html,
  };

  if (replyTo) {
    payload.reply_to = replyTo;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to send email via Resend');
  }

  return data;
}
