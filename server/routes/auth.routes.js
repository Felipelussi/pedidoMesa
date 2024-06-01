import express from "express";
import * as db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const saltRounds = 10;
const myPassword = "teste";

router.post("/", async function (req, res) {
  const user = req.body;

  try {
    const userData = await db.query(
      "SELECT userId, userPassword FROM users WHERE userEmail = $1",
      [user.email]
    );

    const userPassword = userData.rows[0].userpassword;
    const userId = userData.rows[0].userid;
    console.log("userId :>> ", userId);
    console.log("digiotu", user.password);
    console.log("bancopass", userPassword);

    const result = bcrypt.compareSync(
      user.password,
      userPassword,
      (err, result) => result
    );

    if (result)
      return res
        .status(200)
        .send(jwt.sign({ id: userId }, "test", { expiresIn: 45 }));

    return res.status(401).send("Usuário ou senha incorretos");
  } catch (err) {
    console.error(err);
  }

  // return res.status(401).send('Usuário ou senha incorretos')
});

export default router;
