import { sendEmail } from '../services/resendService.js';
import { generateEmailTemplate, escapeHtml } from '../services/templateService.js';

export async function handleSendEmail(req, res) {
  try {
    const { type, title, data, notes, subject, html, reply_to, replyTo, to } = req.body;

    // Determine target recipient & replyTo
    const targetReplyTo = reply_to || replyTo;

    // Build subject line dynamically if not explicitly given
    const emailSubject = subject || `[DS-GRAPHIX] New Submission: ${title || type || 'Enquiry'}`;

    // If custom HTML is provided, use it; otherwise generate production-grade template
    let finalHtml = html;
    if (!finalHtml) {
      finalHtml = generateEmailTemplate({
        type: type || 'WEBSITE FORM',
        title: title || 'New Website Inquiry',
        data: data || {},
        notes: notes || '',
      });
    }

    // Dispatch email via Resend Service
    const resendData = await sendEmail({
      subject: emailSubject,
      html: finalHtml,
      replyTo: targetReplyTo,
      to,
    });

    return res.status(200).json({
      success: true,
      message: 'Email processed and sent successfully via backend Resend service',
      data: resendData,
    });
  } catch (error) {
    console.error('❌ Server Error processing email dispatch:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error processing email dispatch',
    });
  }
}
