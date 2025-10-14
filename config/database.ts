export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      connectionString: env("DATABASE_URL"),
      ssl: env.bool("DATABASE_SSL", false)
        ? { rejectUnauthorized: false }
        : false,
    },
  },
});
