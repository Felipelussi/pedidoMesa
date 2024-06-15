import * as db from "../database/db.js";

import {
  createService,
  findByIdService,
  findAllService,
} from "../services/users.services.js";

async function create(req, res) {
  try {
    const user = req.body;
    if (!user.name || !user.email || !user.password) {
      return res
        .status(500)
        .send(
          "Falha ao registrar usuário. Por favor, preencha todos os campos!"
        );
    }

    const userRegister = await createService({ ...user });

    res.status(200).send("Usuário registrado");
  } catch (err) {
    return res.status(500).send("Falha ao Registrar usuário");
  }
}

async function findById(req, res) {
  try {
    const id = req.params.id;
    const user = await findByIdService(id);
    if (!user) return res.status(401).send("Usuário não encontrado");
    return res.send(user);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function findAll(req, res) {
  try {
    const users = await findAllService();
    res.status(200).send(users);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}
export { create, findById, findAll };
