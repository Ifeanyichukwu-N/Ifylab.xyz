import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import 'dotenv/config';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request body parsing
  app.use(express.json());

  // API endpoint for receiving and sending the contact inquiry
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, company, email, subject, message } = req.body;

      // Validate inputs strictly
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: "Name is required." });
      }
      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "A valid email address is required." });
      }
      if (!subject || typeof subject !== 'string' || subject.trim() === '') {
        return res.status(400).json({ error: "Subject is required." });
      }
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ error: "Message body is required." });
      }

      let resendApiKey = process.env.RESEND_API_KEY || "";
      let contactEmail = process.env.CONTACT_EMAIL || "andrew_ifeanyichukwu@outlook.com";

      // Strip any accidental outer quotes from the environment variables (very common configuration issue)
      resendApiKey = resendApiKey.trim().replace(/^["']|["']$/g, "");
      contactEmail = contactEmail.trim().replace(/^["']|["']$/g, "");

      // If the API key is missing or is the placeholder, fail gracefully on the user end but log details server-side
      if (!resendApiKey || resendApiKey === "" || resendApiKey === "your_resend_api_key") {
        console.error("[SERVER ERROR] RESEND_API_KEY is not defined or is placeholder in the environment.");
        return res.status(400).json({ 
          error: "API Key Not Configured: Please add your real RESEND_API_KEY inside the AI Studio 'Settings' menu (found in the top-right of your build panel) to enable live email delivery." 
        });
      }

      // Proactively validate the Resend API Key format (it must start with 're_')
      if (!resendApiKey.startsWith("re_")) {
        console.error(`[SERVER ERROR] RESEND_API_KEY starts with an invalid prefix: "${resendApiKey.substring(0, 5)}..."`);
        return res.status(400).json({
          error: "Invalid API Key Format: Your RESEND_API_KEY must start with the standard 're_' prefix. Please check and re-enter your key in the AI Studio Settings menu."
        });
      }

      const companyDisplay = company && company.trim() !== "" ? company.trim() : "Not Specified";
      const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC";

      // Design an elegant HTML template matching Andrew's premium dark/gold portfolio identity
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
              padding: 40px;
            }
            .field-group {
              margin-bottom: 25px;
            }
            .field-label {
              font-size: 10px;
              color: #C59B27;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              font-weight: 600;
              margin-bottom: 6px;
            }
            .field-value {
              font-size: 15px;
              color: #E2E8F0;
              line-height: 1.6;
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
            .footer {
              padding: 20px 40px;
              background-color: #08090C;
              border-top: 1px solid #1E293B;
              text-align: center;
              font-size: 11px;
              color: #64748B;
            }
            .footer a {
              color: #C59B27;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Inquiry Draft</h1>
              <p>Andrew Ifeanyichukwu Portfolio</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="field-label">Subject</div>
                <div class="field-value" style="font-size: 18px; font-weight: 600; color: #FFFFFF;">${subject}</div>
              </div>
              
              <div class="field-group">
                <div class="field-label">Sender Name</div>
                <div class="field-value" style="font-weight: 500; color: #FFFFFF;">${name}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Company / Protocol</div>
                <div class="field-value" style="font-weight: 500; color: #FFFFFF;">${companyDisplay}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Sender Email</div>
                <div class="field-value">
                  <a href="mailto:${email}" style="color: #38BDF8; text-decoration: none;">${email}</a>
                </div>
              </div>

              <div class="field-group">
                <div class="field-label">Message Body</div>
                <div class="field-value-box">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
              </div>

              <div class="field-group" style="margin-bottom: 0;">
                <div class="field-label">Submission Timestamp</div>
                <div class="field-value" style="font-size: 13px; color: #94A3B8;">${timestamp}</div>
              </div>
            </div>
            <div class="footer">
              This inquiry was submitted via Andrew Ifeanyichukwu's executive portfolio.
            </div>
          </div>
        </body>
        </html>
      `;

      // Relaying submission directly to Resend REST API
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: "Andrew Portfolio Inquiry <onboarding@resend.dev>",
          to: [contactEmail],
          reply_to: email,
          subject: `New Inquiry — ${subject}`,
          html: htmlContent
        })
      });

      if (!resendResponse.ok) {
        const errorText = await resendResponse.text();
        console.error(`[SERVER ERROR] Resend API status ${resendResponse.status}: ${errorText}`);
        
        let customMessage = "Failed to dispatch email via Resend.";
        try {
          const parsed = JSON.parse(errorText);
          if (parsed.message) {
            customMessage += ` Info: ${parsed.message}`;
          } else {
            customMessage += ` Details: ${errorText}`;
          }
        } catch (_) {
          customMessage += ` Details: ${errorText}`;
        }

        // Add helpful onboarding hint if relevant
        if (resendResponse.status === 401) {
          customMessage += " (Tip: Ensure your RESEND_API_KEY is configured correctly in the AI Studio Settings menu.)";
        } else if (resendResponse.status === 403 || errorText.toLowerCase().includes("restriction") || errorText.toLowerCase().includes("onboarding")) {
          customMessage += " (Tip: Free tier / onboarding Resend API keys are restricted to sending emails strictly to your own registered Resend account owner email address. Please make sure CONTACT_EMAIL in your environment matches the email you signed up to Resend with.)";
        }

        return res.status(400).json({ 
          error: customMessage 
        });
      }

      const resData = await resendResponse.json();
      return res.json({ success: true, id: resData.id });

    } catch (err: any) {
      console.error("[SERVER ERROR] Unexpected error in /api/contact:", err);
      return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
