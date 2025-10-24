import nodemailer from "nodemailer";

export async function send({ to, subject, html }) {
  console.log("📨 Tentative d'envoi via Nodemailer...");
  console.log("🔍 Destinataire :", to);
  console.log("🔍 Expéditeur :", process.env.SMTP_USERNAME);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to,
      subject,
      html,
    });

    console.log("✅ Email envoyé :", info.response);
    return info;
  } catch (err) {
    console.error("❌ Erreur SMTP Nodemailer :", err);
    throw err;
  }
}
