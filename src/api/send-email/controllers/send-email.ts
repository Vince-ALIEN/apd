import { Strapi } from "@strapi/strapi";

export default {
  async send(ctx: any) {
    const { name, email, phone, subject, message } = ctx.request.body;

    if (!name || !email || !message) {
      return ctx.badRequest("Nom, email et message sont requis.");
    }

    try {
      await strapi.plugins["email"].services.email.send({
        to: "destinataire@example.com", // ✅ remplace par ton adresse de réception
        from: email,
        replyTo: email,
        subject: subject || "Message de contact",
        text: `
Nom : ${name}
Email : ${email}
Téléphone : ${phone || "non fourni"}
Message :
${message}
        `,
      });

      ctx.send({ success: true });
    } catch (err) {
      strapi.log.error("Erreur d’envoi d’email :", err);
      ctx.internalServerError("Échec de l’envoi.");
    }
  },
};
