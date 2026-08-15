/**
 * Resend Email Client Service for DS-Graphix
 * All email dispatches are securely delegated to the Backend Server (/api/send-email).
 * No API Keys or Environment Variables are stored on or exposed to the client side.
 */

export async function sendWebsiteEmail({
  type = 'GENERAL ENQUIRY',
  title = 'Website Submission',
  subject = null,
  html = null,
  data = {},
  notes = '',
  replyTo = null,
  to = null
}) {
  const payload = {
    type,
    title,
    data,
    notes,
  };

  if (subject) payload.subject = subject;
  if (html) payload.html = html;
  if (replyTo) payload.reply_to = replyTo;
  if (to) payload.to = to;

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.error || resData.message || 'Failed to send email via backend server');
    }

    return { success: true, data: resData };
  } catch (error) {
    console.error('Error sending email via backend API:', error.message);
    return { success: false, error: error.message };
  }
}
