import * as db from "../database/db.js";
import bcrypt from "bcrypt";
import {
  createService,
  findByIdService,
  findAllService,
} from "../services/users.services.js";

async function createUser(req, res) {
  try {
    const user = req.body;
    if (!user.name || !user.email || !user.password) {
      return res
        .status(500)
        .send(
          "Falha ao registrar usuário. Por favor, preencha todos os campos!"
        );
    }
    const password = await bcrypt.hash(user.password, 10);
    const userRegister = await createService({ ...user, password: password });

    res.status(200).send("Usuário registrado");
  } catch (err) {
    return res.status(500).send("Falha ao Registrar usuário");
  }
}

async function findById(req, res) {
  const id = req.params.id;
  const user = await findByIdService(id);
  if (!user) return res.status(401).send("Usuário não encontrado");
  return res.send(user);
}

async function findAll(req, res) {
  try {
    const users = await findAllService();
    res.status(200).send(users.rows);
  } catch (e) {
    return res.status(400).send("Erro ao buscar usuários");
  }
}
export { createUser, findById, findAll };
