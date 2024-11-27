import {Router} from 'express';
import { createSocio, deleteSocio, getSocio, getSocioId, updateSocio, loginSocio } from '../controllers/socioController.js';

const socioRouter = Router ();

socioRouter.get('/api/socio', getSocio);
socioRouter.get('/api/socio/:id', getSocioId);
socioRouter.post('/api/socio', createSocio);
socioRouter.patch('/api/socio/:id', updateSocio);
socioRouter.delete('/api/socio/:id', deleteSocio);
socioRouter.get('/api/loginSocio', loginSocio);

export default socioRouter;