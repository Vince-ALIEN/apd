export default ({ env }) => ({
  // Plugin Email (si utilisé)
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.resend.com",
        port: 587,
        auth: {
          user: env("SMTP_USER"),
          pass: env("SMTP_PASS"),
        },
      },
      settings: {
        defaultFrom: env("SMTP_FROM"),
        defaultReplyTo: env("SMTP_FROM"),
      },
    },
  },

  // Plugin Upload (Cloudinary)
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          resource_type: "auto", // permet image, vidéo, raw
        },
        delete: {},
      },
    },
  },
});
