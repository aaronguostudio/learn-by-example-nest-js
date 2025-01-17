export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10) || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    name: process.env,
  },
});
