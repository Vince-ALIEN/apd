export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:3000",
        "http://192.168.1.101:3000",
        "https://apd-three.vercel.app",
        "https://eglise-aules.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      formLimit: "512mb",
      jsonLimit: "512mb",
      textLimit: "512mb",
      formidable: {
        maxFileSize: 500 * 1024 * 1024, // 500MB
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
