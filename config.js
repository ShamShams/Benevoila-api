export const port = process.env.PORT || 3000;

export const db = {
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  database: process.env.PGDATABASE || 'benevoiladb',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'admin',
};
