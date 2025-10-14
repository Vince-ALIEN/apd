const nodemailer = require("nodemailer");

module.exports = {
  async send(ctx) {
    const { name, email, subject, message } = ctx.request.body;

    if (!name || !email || !message) {
      return ctx.badRequest("Nom, email et message sont requis.");
    }

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.example.com", // ex: smtp.gmail.com
        port: 587,
        secure: false,
        auth: {
          user: "ton-email@example.com",
          pass: "ton-mot-de-passe",
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: "destinataire@example.com",
        subject: subject || "Message de contact",
        text: message,
      });

      ctx.send({ success: true });
    } catch (err) {
      console.error("Erreur d'envoi :", err);
      ctx.internalServerError("Échec de l'envoi.");
    }
  },
};
