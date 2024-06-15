import express from "express";
import { create, findAll, findById } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/", create);

router.get("/", findAll);

router.get("/:id", findById);

export default router;
