import {Router} from 'express';
import {
    getSocios,
    getSocio,
    createSocio,
    deleteSocio,
    updateSocio,
    loginSocio
} from '../controllers/socioController.js';

const socioRouter = Router ();

socioRouter.get('/api/getSocios', getSocios);
socioRouter.get('/api/getSocio/:id', getSocio);
socioRouter.post('/api/createSocio', createSocio);
socioRouter.delete('/api/deleteSocio/:id', deleteSocio);
socioRouter.put('/api/updateSocio/:id', updateSocio);
socioRouter.post('/api/loginSocio', loginSocio);

export default socioRouter;