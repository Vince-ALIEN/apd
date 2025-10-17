import { resend } from "../utils/resend";

export async function send({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return await resend.emails.send({
    from: process.env.SMTP_FROM || "eglise.aules@gmail.com",
    to,
    subject,
    html,
  });
}
