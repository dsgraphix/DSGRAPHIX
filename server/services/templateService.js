/**
 * Production-Grade HTML Email Templates for DS-Graphix
 * Includes HTML Sanitization, Responsive Layouts, and Brand Styling.
 */

// Utility function to escape HTML special characters to prevent injection attacks
export function escapeHtml(str) {
  if (typeof str !== 'string') return str || '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate a Production-Grade HTML Email Body
 */
export function generateEmailTemplate({ type, title, data = {}, notes = '' }) {
  const currentYear = new Date().getFullYear();
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const escapedTitle = escapeHtml(title || 'DS-Graphix Website Submission');
  const safeNotes = escapeHtml(notes);

  // Generate data rows for key-value table
  const rowsHtml = Object.entries(data)
    .filter(([_, val]) => val !== undefined && val !== null && val !== '')
    .map(([key, val]) => {
      const isUrl = typeof val === 'string' && (val.startsWith('http://') || val.startsWith('https://'));
      const isEmail = typeof val === 'string' && val.includes('@') && !isUrl;
      const formattedVal = isUrl
        ? `<a href="${escapeHtml(val)}" target="_blank" style="color: #FF6636; text-decoration: underline; font-weight: bold;">${escapeHtml(val)}</a>`
        : isEmail
        ? `<a href="mailto:${escapeHtml(val)}" style="color: #60A5FA; text-decoration: underline;">${escapeHtml(val)}</a>`
        : escapeHtml(String(val));

      return `
        <tr>
          <td style="padding: 10px 14px; font-weight: bold; width: 35%; color: #FF6636; border-bottom: 1px solid #333333; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
            ${escapeHtml(key)}
          </td>
          <td style="padding: 10px 14px; color: #F1F5F9; border-bottom: 1px solid #333333; font-size: 14px; line-height: 1.5;">
            ${formattedVal}
          </td>
        </tr>
      `;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapedTitle}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #121212; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #121212; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" style="max-width: 640px; background-color: #1A1A19; border: 3px solid #FF6636; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
              
              <!-- Header Bar -->
              <tr>
                <td style="background-color: #FF6636; padding: 20px 24px; text-align: center;">
                  <div style="font-size: 12px; font-weight: 900; letter-spacing: 3px; color: #1A1A19; text-transform: uppercase; margin-bottom: 4px;">
                    DS-GRAPHIX OFFICIAL NOTIFICATION
                  </div>
                  <div style="font-size: 22px; font-weight: 900; color: #1A1A19; text-transform: uppercase; letter-spacing: 1px;">
                    ${escapedTitle}
                  </div>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding: 28px 24px;">
                  
                  <!-- Type Badge -->
                  <div style="display: inline-block; background-color: #2A2A29; border: 1px solid #FF6636; color: #FF6636; padding: 6px 14px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 20px; border-radius: 4px;">
                    SUBMISSION TYPE: ${escapeHtml(type || 'GENERAL ENQUIRY')}
                  </div>

                  <!-- Details Table -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #2A2A29; border-radius: 6px; overflow: hidden; margin-bottom: 24px; border: 1px solid #333333;">
                    ${rowsHtml}
                  </table>

                  <!-- Notes / Message Box -->
                  ${
                    safeNotes
                      ? `
                    <div style="background-color: #2A2A29; border-left: 4px solid #FF6636; border-radius: 4px; padding: 18px; margin-bottom: 24px; border-top: 1px solid #333; border-right: 1px solid #333; border-bottom: 1px solid #333;">
                      <div style="font-size: 11px; font-weight: 900; color: #FF6636; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                        ATTACHED NOTES / BRIEF:
                      </div>
                      <div style="font-size: 14px; color: #E2E8F0; line-height: 1.7; white-space: pre-wrap;">
                        ${safeNotes}
                      </div>
                    </div>
                    `
                      : ''
                  }

                  <!-- Timestamp & Security Note -->
                  <div style="background-color: #121212; padding: 12px 16px; border-radius: 4px; font-size: 12px; color: #94A3B8; text-align: center; border: 1px dashed #333;">
                    Received on: <strong>${timestamp} IST</strong>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #121212; padding: 16px 24px; text-align: center; border-top: 1px solid #262626; font-size: 12px; color: #64748B;">
                  <div>DS-Graphix Backend Email Service &bull; Verified Domain: <strong style="color: #94A3B8;">dsgraphix.in</strong></div>
                  <div style="margin-top: 4px;">&copy; ${currentYear} DS-Graphix. All Rights Reserved.</div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
