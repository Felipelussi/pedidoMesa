import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "souomapa201",
  host: "localhost",
  port: 5432,
  database: "pedidoMesa",
});

export const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};
