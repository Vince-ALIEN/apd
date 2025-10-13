import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "eglise.aules@gmail.com",
    pass: "wigk lugo ikuk nmkg",
  },
});

transporter.sendMail(
  {
    from: '"Église Aules" <eglise.aules@gmail.com>',
    to: "admin@tondomaine.com",
    subject: "Test SMTP direct",
    text: "Ceci est un test SMTP sans Strapi.",
  },
  (err, info) => {
    if (err) {
      console.error("❌ Erreur SMTP :", err);
    } else {
      console.log("✅ Email envoyé :", info.response);
    }
  }
);
