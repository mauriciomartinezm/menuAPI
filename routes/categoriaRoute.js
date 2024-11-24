import { Router } from 'express';
import { createCategoria, deleteCategoria, getCategoria, getCategoriaId, updateCategoria } from '../controllers/categoriaController.js';

const categoriaRouter = Router();

categoriaRouter.get('/api/categoria', getCategoria);
categoriaRouter.get('/api/categoria/:id', getCategoriaId);
categoriaRouter.post('/api/categoria', createCategoria);
categoriaRouter.patch('/api/categoria/:id', updateCategoria);
categoriaRouter.delete('/api/categoria/:id', deleteCategoria);


export default categoriaRouter;