export default [
  "strapi::logger",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:3000",
        "http://192.168.1.101:3000",
        "https://apd-three.vercel.app",
        "https://eglise-aules.vercel.app",
        "https://apd-7ov8.onrender.com",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      headers: [
        "Content-Type",
        "Authorization",
        "Origin",
        "Accept",
        "X-Requested-With",
        "Access-Control-Allow-Credentials",
      ],
      credentials: true,
      maxAge: 86400, // 24h
    },
  },
  {
    name: "strapi::body",
    config: {
      formLimit: "512mb",
      jsonLimit: "512mb",
      textLimit: "512mb",
      formidable: {
        maxFileSize: 1 * 1024 * 1024 * 1024, // 1 Go
      },
    },
  },
  "strapi::errors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
