const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Send an email using Gmail SMTP
 * @param {string} toEmail - Recipient email
 * @param {string} subject - Email subject
 * @param {string} body - Email body (HTML or plain text)
 * @param {boolean} isHtml - Whether body is HTML (default true)
 * @param {number} port - SMTP port (default 587)
 */
const mailSender = async (toEmail, subject, body, isHtml = true, port = 587) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: port,
      secure: false, // false for TLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.MAIL_USER}>`,
      to: toEmail,
      subject: subject,
      [isHtml ? 'html' : 'text']: body,
    });

    console.log(`✅ Email sent to ${toEmail} with subject '${subject}'`);
    return info;
  } catch (err) {
    console.error(`❌ Error sending email: ${err.message || err}`);
    throw err;
  }
};

module.exports = mailSender;
