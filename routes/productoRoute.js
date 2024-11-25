import {Router} from 'express';
import { createProducto, deleteProducto, getProducto, getProductoId, updateProducto } from '../controllers/productoController.js';

const productoRouter = Router ();

productoRouter.get('/api/producto', getProducto);
productoRouter.get('/api/producto/:id', getProductoId);
productoRouter.post('/api/producto', createProducto);
productoRouter.patch('/api/producto/:id', updateProducto);
productoRouter.delete('/api/producto/:id', deleteProducto);


export default productoRouter;