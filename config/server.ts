export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: parseInt(process.env.PORT, 10) || env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  middleware: {
    settings: {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://192.168.1.101:3000",
          "https://apd-three.vercel.app",
          "https://eglise-aules.vercel.app",
          "https://apd-7ov8.onrender.com",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        headers: ["Content-Type", "Authorization", "Origin", "Accept"],
        credentials: true,
        maxAge: 31536000,
      },
    },
  },
});
