module.exports = {
  database: process.env.POSTGRES_DB,
  entities: ["entity/**/*.ts"],
  host: process.env.POSTGRES_ADDRESS,
  migrations: ["migration/**/*.ts"],
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  type: "postgres",
  synchronize: false,
  cli: {
    entitiesDir: "entity",
    migrationsDir: "migration",
  },
};
