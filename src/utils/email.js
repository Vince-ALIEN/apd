import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Envoie un email via Gmail SMTP
 * @param {Object} options
 * @param {string} options.to - Destinataire
 * @param {string} options.subject - Sujet de l'email
 * @param {string} options.text - Contenu brut
 * @param {string} [options.html] - Contenu HTML (optionnel)
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: `"Église Aules" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
};
