import { Router } from 'express';
import { createHorario, deleteHorario, getHorario, getHorarioId, updateHorario } from '../controllers/horarioController.js';

const horarioRouter = Router();

horarioRouter.get('/api/horario', getHorario);
horarioRouter.get('/api/horario/:id', getHorarioId);
horarioRouter.post('/api/horario', createHorario);
horarioRouter.patch('/api/horario/:id', updateHorario);
horarioRouter.delete('/api/horario/:id', deleteHorario);


export default horarioRouter;