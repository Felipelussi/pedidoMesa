import * as db from "../database/db.js";

async function createService(user) {
  const res = await db.query(
    "INSERT INTO users  (userName, userPassword, userEmail) VALUES ($1, $2, $3)",
    [user.name, user.password, user.email]
  );
  return res;
}

async function findByIdService(id) {
  try {
    const data = await db.query(
      "SELECT username, useremail FROM users WHERE userid = $1",
      [id]
    );
    return data.rows[0];
  } catch (e) {
    return undefined;
  }
}

async function findAllService() {
  return await db.query("SELECT username, userpassword FROM users");
}
export { createService, findByIdService, findAllService };
