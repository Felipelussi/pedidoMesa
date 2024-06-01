import express from "express";
import {
  createUser,
  findAll,
  findById,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", findAll);

router.get("/:id", findById);

router.post("/", createUser);

export default router;
