export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || 'DS-Graphix <hello@dsgraphix.in>';
    const toEmail = process.env.TO_EMAIL || 'hello@dsgraphix.in';

    if (!apiKey) {
      return res.status(500).json({ error: 'Email service not configured. Set RESEND_API_KEY in environment variables.' });
    }

    const payload = {
      from: fromEmail,
      to: data.to ? (Array.isArray(data.to) ? data.to : [data.to]) : [toEmail],
      subject: data.subject || 'Website Submission',
      html: data.html || '<p>No content provided</p>',
    };

    if (data.reply_to || data.replyTo) {
      payload.reply_to = data.reply_to || data.replyTo;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const resData = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: resData.message || 'Resend API error', details: resData });
    }

    return res.status(200).json({ success: true, data: resData });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
