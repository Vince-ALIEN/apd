export default {
  async send(ctx: any) {
    const { name, email, phone, subject, message } = ctx.request.body;

    if (!name || !email || !message) {
      return ctx.badRequest("Nom, email et message sont requis.");
    }

    try {
      strapi.log.info("Tentative d'envoi d'email avec :", {
        to: "eglise.aules@gmail.com",
        from: email,
        replyTo: email,
        subject: subject || "Message de contact",
      });

      await strapi.plugins["email"].services.email.send({
        to: "eglise.aules@gmail.com",
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

      strapi.log.info("Email envoyé avec succès");
      ctx.send({ success: true });
    } catch (err: any) {
      strapi.log.error("Erreur d'envoi d'email :", err);
      strapi.log.error("Détails erreur :", {
        message: err.message,
        code: err.code,
        response: err.response,
      });
      ctx.internalServerError("Échec de l'envoi.");
    }
  },
};
