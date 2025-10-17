export default ({ env }) => ({
  // Plugin Email (si utilisé)
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 465), //465 OR 587
        auth: {
          user: env("SMTP_USERNAME"), // YOUR_EMAIL@gmail.com, prefer .env file
          pass: env("SMTP_PASSWORD"), // search "Google App Password", create password phrase and add to .env file
        },
      },
      settings: {
        defaultFrom: env("SMTP_USERNAME"), // in .env file
        defaultReplyTo: env("SMTP_USERNAME"), // in .env file, could be SMTP_REPLY_USERNAME
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
