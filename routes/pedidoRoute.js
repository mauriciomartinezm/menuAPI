import { Router } from "express";
import {
    createPedido,
    getPedido,
    getPedidoProducto,
    getPedidoProductoID,
    getPedidoUsuario
} from "../controllers/pedidoController.js";

const pedidoRouter = Router();

pedidoRouter.get("/api/pedido", getPedido);
pedidoRouter.get("/api/pedido/:id", getPedidoUsuario);
pedidoRouter.get("/api/pedido-producto", getPedidoProducto);
pedidoRouter.get("/api/pedido-producto/:id", getPedidoProductoID);
//resenaRouter.get("/api/resena/:id", getResenaId);
//resenaRouter.get("/api/resena/restaurante/:id", getResenaRestaurante);
pedidoRouter.post("/api/pedido", createPedido);
//resenaRouter.patch("/api/resena/:id", updateResena);
//resenaRouter.delete("/api/resena/:id", deleteResena);

export default pedidoRouter;
