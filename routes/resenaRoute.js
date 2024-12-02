import { Router } from "express";
import {
  createResena,
  deleteResena,
  getResena,
  getResenaId,
  getResenaRestaurante,
  updateResena,
} from "../controllers/resenaController.js";

const resenaRouter = Router();

resenaRouter.get("/api/resena", getResena);
resenaRouter.get("/api/resena/:id", getResenaId);
resenaRouter.get("/api/resena/restaurante/:id", getResenaRestaurante);
resenaRouter.post("/api/resena", createResena);
resenaRouter.patch("/api/resena/:id", updateResena);
resenaRouter.delete("/api/resena/:id", deleteResena);

export default resenaRouter;
