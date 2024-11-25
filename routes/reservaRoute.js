import {Router} from 'express';
import { createReserva, deleteReserva, getReserva, getReservaId, updateReserva } from '../controllers/reservaController.js';

const reservaRouter = Router ();

reservaRouter.get('/api/Reserva', getReserva);
reservaRouter.get('/api/Reserva/:id', getReservaId);
reservaRouter.post('/api/Reserva', createReserva);
reservaRouter.patch('/api/Reserva/:id', updateReserva);
reservaRouter.delete('/api/Reserva/:id', deleteReserva);


export default reservaRouter;