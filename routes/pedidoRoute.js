import {Router} from 'express';
import { createPedido, deletePedido, getPedido, getPedidoId, updatePedido } from '../controllers/pedidoController.js';

const pedidoRouter = Router ();

pedidoRouter.get('/api/pedido', getPedido);
pedidoRouter.get('/api/pedido/:id', getPedidoId);
pedidoRouter.post('/api/pedido', createPedido);
pedidoRouter.patch('/api/pedido/:id', updatePedido);
pedidoRouter.delete('/api/pedido/:id', deletePedido);


export default pedidoRouter;