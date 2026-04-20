const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// POST /api/contact - send support email
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587/STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toAddress = process.env.SUPPORT_EMAIL_TO || "abhipbx019@gmail.com";
    const fromAddress = process.env.SUPPORT_EMAIL_FROM || process.env.SMTP_USER;

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ error: "SMTP is not configured on the server." });
    }

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject: `Support request from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.json({ success: true, message: "Your message was sent." });
  } catch (err) {
    console.error("Contact mail error:", err);
    res.status(500).json({ error: "Failed to send message." });
  }
});

module.exports = router;
