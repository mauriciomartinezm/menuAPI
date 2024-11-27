import { Router } from "express";
import {
  createRestaurante,
  deleteRestaurante,
  getRestauranteId,
  getRestaurantes,
  updateRestaurante,
} from "../controllers/restaurantController.js";

const restaurantRouter = Router();

restaurantRouter.get("/api/restaurante", getRestaurantes);
restaurantRouter.get("/api/restaurante/:id", getRestauranteId);
restaurantRouter.post("/api/restaurante", createRestaurante);
restaurantRouter.patch("/api/restaurante/:id", updateRestaurante);
restaurantRouter.delete("/api/restaurante/:id", deleteRestaurante);

export default restaurantRouter;
