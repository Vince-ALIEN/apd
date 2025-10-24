import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.sendMail(
  {
    from: process.env.SMTP_USERNAME,
    to: process.env.CONTACT_RECEIVER,
    subject: "Test Gmail",
    html: "<p>✅ Test réussi !</p>",
  },
  (err, info) => {
    if (err) {
      console.error("❌ Erreur SMTP :", err);
    } else {
      console.log("✅ Email envoyé :", info.response);
    }
  }
);
