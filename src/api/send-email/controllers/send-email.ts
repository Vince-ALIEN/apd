"use strict";

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  async send(ctx) {
    const { name, email, phone, subject, message } = ctx.request.body;

    if (!email || !message || !name) {
      return ctx.badRequest("Champs requis manquants.");
    }

    try {
      const result = await resend.emails.send({
        from: process.env.SMTP_FROM || "eglise.aules@gmail.com",
        to: process.env.CONTACT_RECEIVER || "contact@tondomaine.com",
        subject: subject || `Message de ${name}`,
        html: `
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
          <p><strong>Message :</strong><br/>${message}</p>
        `,
      });

      ctx.send({ success: true, result });
    } catch (err) {
      console.error("Erreur Resend :", err);
      ctx.internalServerError("Échec de l’envoi du message.");
    }
  },
};
