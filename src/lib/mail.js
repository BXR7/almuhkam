import { escapeHtml } from "./validation";
import nodemailer from "nodemailer";

export async function sendInquiryNotificationEmail(inquiry) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465");
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER || "jalal611@gmail.com";
  const pass = process.env.SMTP_PASS; // Gmail App Password
  const toEmail = process.env.NOTIFICATION_EMAIL || "jalal611@gmail.com";

  // If no password is provided in .env, skip sending and log info
  if (!pass) {
    console.log(`ℹ️ [Email Notification] Skipped sending email: SMTP_PASS is not set in .env. Inquiry was saved to database.`);
    return { success: false, reason: "SMTP_PASS not configured" };
  }

  try {
    const replyTo = inquiry.email;
    inquiry = Object.fromEntries(Object.entries(inquiry).map(([key, value]) => [key, typeof value === "string" ? escapeHtml(value) : value]));
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      disableFileAccess: true,
      disableUrlAccess: true,
      auth: {
        user,
        pass,
      },
    });

    const whatsappUrl = inquiry.phone
      ? `https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}`
      : null;

    const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f6f2; margin: 0; padding: 20px; color: #1a1f1c; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        .header { background: #083b2e; color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid #b1843e; }
        .header h1 { margin: 0; font-size: 22px; color: #fffdf8; }
        .content { padding: 28px 24px; }
        .item { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
        .label { font-size: 13px; color: #5a6b63; font-weight: bold; margin-bottom: 4px; display: block; }
        .value { font-size: 16px; color: #0d5c46; font-weight: 600; }
        .message-box { background: #faf9f6; border: 1px solid #e6f2ee; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.8; color: #1a1f1c; white-space: pre-wrap; }
        .actions { margin-top: 24px; text-align: center; display: flex; gap: 12px; justify-content: center; }
        .btn { display: inline-block; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; }
        .btn-whatsapp { background-color: #25D366; color: #ffffff !important; }
        .btn-dashboard { background-color: #0d5c46; color: #ffffff !important; }
        .footer { background: #f7f6f2; padding: 16px; text-align: center; font-size: 12px; color: #79837c; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 طلب تدقيق لغوي جديد</h1>
          <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.85; color: #e5d3a3;">وصلك طلب استفسار جديد عبر منصة الجلال</p>
        </div>
        <div class="content">
          <div class="item">
            <span class="label">اسم العميل:</span>
            <span class="value">${inquiry.name}</span>
          </div>
          <div class="item">
            <span class="label">البريد الإلكتروني:</span>
            <span class="value" style="direction: ltr; display: inline-block;"><a href="mailto:${inquiry.email}" style="color: #0d5c46;">${inquiry.email}</a></span>
          </div>
          ${inquiry.phone ? `
          <div class="item">
            <span class="label">رقم الهاتف / واتساب:</span>
            <span class="value" style="direction: ltr; display: inline-block;">${inquiry.phone}</span>
          </div>
          ` : ''}
          <div class="item">
            <span class="label">الخدمة المطلوبة:</span>
            <span class="value" style="color: #b1843e;">${inquiry.service}</span>
          </div>
          <div class="item" style="border-bottom: none;">
            <span class="label">تفاصيل الطلب والرسالة:</span>
            <div class="message-box">${inquiry.message}</div>
          </div>

          <div class="actions">
            ${whatsappUrl ? `
            <a href="${whatsappUrl}" class="btn btn-whatsapp" target="_blank">
              محادثة العميل عبر واتساب 💬
            </a>
            ` : ''}
            <a href="http://localhost:3000/admin/inquiries" class="btn btn-dashboard" target="_blank">
              فتح لوحة التحكم ⚙️
            </a>
          </div>
        </div>
        <div class="footer">
          تم إرسال هذا الإشعار تلقائياً من منصة الجلال للتدقيق اللغوي والتحرير الأكاديمي
        </div>
      </div>
    </body>
    </html>
    `;

    const info = await transporter.sendMail({
      from: `"منصة الجلال" <${user}>`,
      to: toEmail,
      replyTo,
      subject: `📬 طلب تدقيق جديد: ${inquiry.service} — من (${inquiry.name})`,
      html: htmlContent,
    });

    console.log("✅ [Email Notification] Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email notification failed");
    return { success: false, reason: "delivery failed" };
  }
}
