import {Router} from 'express';
import { createSocio, deleteSocio, getSocios, getSocio, updateSocio, loginSocio, verificarTokenSocio, getRestaurante, cambioContrasenaSocio, solicitarCambio } from '../controllers/socioController.js';

const socioRouter = Router ();

socioRouter.get('/api/socio', getSocios);
socioRouter.get('/api/socio/me', verificarTokenSocio, getSocio);
socioRouter.post('/api/createSocio', createSocio);
socioRouter.patch('/api/socio/:id', updateSocio);
socioRouter.delete('/api/socio/:id', deleteSocio);
socioRouter.post('/api/loginSocio', loginSocio);
socioRouter.get('/api/getRestaurante/me', verificarTokenSocio, getRestaurante);
socioRouter.patch("/cambiocontrasena", cambioContrasenaSocio);
socioRouter.post("/solicitarcambio",solicitarCambio)
export default socioRouter;