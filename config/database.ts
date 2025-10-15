export default ({ env }) => {
  const isPostgres = env("DATABASE_CLIENT") === "postgres";

  return {
    connection: isPostgres
      ? {
          client: "postgres",
          connection: {
            connectionString: env("DATABASE_URL"),
            ssl: env.bool("DATABASE_SSL", false)
              ? { rejectUnauthorized: false }
              : false,
          },
        }
      : {
          client: "sqlite",
          connection: {
            filename: env("DATABASE_FILENAME", ".tmp/data.db"),
          },
          useNullAsDefault: true,
        },
  };
};
