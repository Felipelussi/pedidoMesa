import * as db from "./db.js";

async function create(user) {
  const { name, password, email } = user;
  return await db.query(
    "INSERT INTO users  (userName, userPassword, userEmail) VALUES ($1, $2, $3)",
    [name, password, email]
  );
}

async function findAll() {
  return (await db.query("SELECT username, userpassword FROM users")).rows;
}
async function findById(id) {
  return await db.query(
    "SELECT username, useremail FROM users WHERE userid = $1",
    [id]
  );
}

export default {
  create,
  findAll,
  findById,
};
