export default {
  async send(ctx: any) {
    const { name, email, phone, subject, message } = ctx.request.body;

    // Validation des champs requis
    if (!name || !email || !message) {
      return ctx.badRequest("Nom, email et message sont requis.");
    }

    const payload = {
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
    };

    try {
      strapi.log.info("Tentative d'envoi d'email avec :", payload);

      await strapi.plugins["email"].services.email.send(payload);

      strapi.log.info("Email envoyé avec succès");
      ctx.send({ success: true });
    } catch (err: any) {
      strapi.log.error("Erreur d'envoi d'email :", err);

      // Log détaillé si disponible
      if (err?.response?.body) {
        strapi.log.error("Réponse SMTP :", err.response.body);
      }

      ctx.send(
        {
          success: false,
          error: "Échec de l'envoi de l'email.",
          details: err.message || "Erreur inconnue",
        },
        500
      );
    }
  },
};
