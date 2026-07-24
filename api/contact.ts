import { Resend } from 'resend';

// Simple in-memory rate-limiter (max 5 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    return { allowed: false };
  }

  record.count += 1;
  return { allowed: true };
}

export default async function handler(req: any, res: any) {
  // Handle CORS preflight if needed
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket?.remoteAddress || '';
    const visitorIp = rawIp || 'Unavailable';
    const userAgent = (req.headers['user-agent'] as string) || 'Unavailable';

    if (rawIp && !checkRateLimit(rawIp)) {
      return res.status(429).json({ 
        error: "Rate limit exceeded. Please wait a few minutes before submitting another inquiry." 
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, company, email, subject, message, phone } = body;

    // Validate inputs strictly
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: "A valid email address is required." });
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: "Message body is required." });
    }

    // Non-sensitive environment variable check and logging
    console.log("Resend key detected:", !!process.env.RESEND_API_KEY);
    console.log("Key prefix:", process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.trim().replace(/^["']|["']$/g, "").slice(0, 3) : "none");

    const rawKey = process.env.RESEND_API_KEY;
    if (!rawKey) {
      console.error("[SERVER ERROR] RESEND_API_KEY is missing from environment variables.");
      return res.status(500).json({ 
        error: "RESEND_API_KEY is missing from the environment settings. Please ensure RESEND_API_KEY is set in Vercel or AI Studio Settings." 
      });
    }

    const resendApiKey = rawKey.trim().replace(/^["']|["']$/g, "");
    let contactEmail = (process.env.CONTACT_EMAIL || "support@ifylab.xyz").trim().replace(/^["']|["']$/g, "");

    if (!resendApiKey || resendApiKey === "your_resend_api_key") {
      console.error("[SERVER ERROR] RESEND_API_KEY is empty or placeholder.");
      return res.status(400).json({ 
        error: "API Key Not Configured: Please enter a valid RESEND_API_KEY in Vercel or AI Studio Settings." 
      });
    }

    if (!resendApiKey.startsWith("re_")) {
      console.error("[SERVER ERROR] RESEND_API_KEY format is invalid (does not start with 're_').");
      return res.status(400).json({
        error: "Invalid Resend API Key Format: Your RESEND_API_KEY must start with 're_'. Please update your key in Vercel or AI Studio Settings."
      });
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedCompany = company && typeof company === 'string' && company.trim() !== "" ? company.trim() : "Not Specified";
    const sanitizedPhone = phone && typeof phone === 'string' && phone.trim() !== "" ? phone.trim() : "Not Provided";
    const sanitizedSubject = subject && typeof subject === 'string' && subject.trim() !== "" ? subject.trim() : "General Inquiry";
    const sanitizedMessage = message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #0B0C10;
            color: #E2E8F0;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #0F1115;
            border: 1px solid #1F2937;
            border-top: 4px solid #C59B27;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          }
          .header {
            padding: 30px 40px;
            background: linear-gradient(180deg, #161920 0%, #0F1115 100%);
            border-bottom: 1px solid #1F2937;
            text-align: center;
          }
          .header h1 {
            font-size: 20px;
            font-weight: 700;
            color: #FFFFFF;
            margin: 0;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .header p {
            font-size: 11px;
            color: #C59B27;
            margin: 5px 0 0 0;
            letter-spacing: 3px;
            text-transform: uppercase;
            font-weight: 600;
          }
          .content {
            padding: 30px 40px;
          }
          .field-group {
            margin-bottom: 20px;
          }
          .field-label {
            font-size: 10px;
            color: #C59B27;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: 600;
            margin-bottom: 4px;
          }
          .field-value {
            font-size: 14px;
            color: #E2E8F0;
            line-height: 1.5;
            word-break: break-word;
          }
          .field-value-box {
            background-color: #08090C;
            border: 1px solid #1E293B;
            padding: 15px;
            border-radius: 6px;
            font-size: 14px;
            color: #E2E8F0;
            line-height: 1.6;
            white-space: pre-wrap;
            font-family: inherit;
          }
          .meta-box {
            background-color: #08090C;
            border: 1px solid #1E293B;
            padding: 12px 16px;
            border-radius: 6px;
            margin-top: 20px;
          }
          .footer {
            padding: 20px 40px;
            background-color: #08090C;
            border-top: 1px solid #1E293B;
            text-align: center;
            font-size: 11px;
            color: #64748B;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Submission</h1>
            <p>ifylab.xyz Official Portal</p>
          </div>
          <div class="content">
            
            <div class="field-group">
              <div class="field-label">Subject</div>
              <div class="field-value" style="font-size: 16px; font-weight: 600; color: #FFFFFF;">${sanitizedSubject}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Name</div>
              <div class="field-value" style="font-weight: 500; color: #FFFFFF;">${sanitizedName}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Email Address</div>
              <div class="field-value">
                <a href="mailto:${sanitizedEmail}" style="color: #38BDF8; text-decoration: none;">${sanitizedEmail}</a>
              </div>
            </div>

            <div class="field-group">
              <div class="field-label">Phone</div>
              <div class="field-value" style="color: #E2E8F0;">${sanitizedPhone}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Company / Protocol</div>
              <div class="field-value" style="color: #E2E8F0;">${sanitizedCompany}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Message Body</div>
              <div class="field-value-box">${sanitizedMessage}</div>
            </div>

            <div class="meta-box">
              <div class="field-group" style="margin-bottom: 8px;">
                <div class="field-label">Submission Timestamp</div>
                <div class="field-value" style="font-size: 12px; color: #94A3B8;">${timestamp}</div>
              </div>
              <div class="field-group" style="margin-bottom: 8px;">
                <div class="field-label">Visitor IP Address</div>
                <div class="field-value" style="font-size: 12px; color: #94A3B8;">${visitorIp}</div>
              </div>
              <div class="field-group" style="margin-bottom: 0;">
                <div class="field-label">User-Agent / Browser</div>
                <div class="field-value" style="font-size: 12px; color: #94A3B8;">${userAgent}</div>
              </div>
            </div>

          </div>
          <div class="footer">
            This message was delivered via the contact system on ifylab.xyz.
          </div>
        </div>
      </body>
      </html>
    `;

    const resend = new Resend(resendApiKey);

    const { data: resData, error: resendErr } = await resend.emails.send({
      from: "IfyLab Website <noreply@ifylab.xyz>",
      to: [contactEmail],
      replyTo: sanitizedEmail,
      subject: `New Contact Form Submission - ${sanitizedName}`,
      html: htmlContent
    });

    if (resendErr) {
      console.error("[SERVER ERROR] Resend SDK error:", JSON.stringify(resendErr));

      let userMsg = "Failed to dispatch email. Please try again later.";
      const errMsg = resendErr.message || "";
      const errStatusCode = (resendErr as any).statusCode;

      if (errStatusCode === 401 || errMsg.toLowerCase().includes("api key") || resendErr.name === "validation_error") {
        userMsg = "Invalid Resend API Key: The RESEND_API_KEY set in your environment is invalid. Please check and re-enter your key from resend.com (starting with 're_') in the AI Studio Settings menu or Vercel Environment Variables.";
      } else if (errMsg.toLowerCase().includes("domain") || errMsg.toLowerCase().includes("not verified")) {
        userMsg = "Domain verification error: Ensure ifylab.xyz is verified in your Resend account settings.";
      }

      return res.status(400).json({ error: userMsg });
    }

    return res.status(200).json({ success: true, id: resData?.id });

  } catch (err: any) {
    console.error("[SERVER ERROR] Unexpected error in /api/contact:", err);
    return res.status(500).json({ 
      error: "An unexpected error occurred while processing your request. Please try again later." 
    });
  }
}
