import {Router} from 'express';
import { createPedido_Productos, getPedido_Producto } from '../controllers/pedido_productoController.js';

const pedido_productoRouter = Router ();

pedido_productoRouter.get('/api/pedido_producto', getPedido_Producto);
//pedido_productoRouter.get('/api/pedido_producto/:id', getpedido_productoId);
pedido_productoRouter.post('/api/pedido_producto', createPedido_Productos);
//pedido_productoRouter.patch('/api/pedido_producto/:id', updatepedido_producto);
//pedido_productoRouter.delete('/api/pedido_producto/:id', deletepedido_producto);


export default pedido_productoRouter;