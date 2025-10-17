import { resend } from "../../../utils/resend";

export async function send(ctx) {
  const { name, email, phone, subject, message } = ctx.request.body;

  await resend.emails.send({
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

  ctx.send({ success: true });
}
