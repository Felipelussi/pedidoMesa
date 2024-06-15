import * as db from "../database/db.js";
import bcrypt from "bcrypt";
import userModel from "../database/user.model.js";

async function createService(user) {
  const password = await bcrypt.hash(user.password, 10);
  const newUser = await userModel.create({ ...user, password: password });
  return newUser;
}

async function findByIdService(id) {
  try {
    const data = await userModel.findById(id);
    return data.rows[0];
  } catch (e) {
    return undefined;
  }
}

async function findAllService() {
  const users = await userModel.findAll();
  if (!users) throw new Error("No user registered");

  return users;
}

export { createService, findByIdService, findAllService };
