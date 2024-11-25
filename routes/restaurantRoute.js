import {Router} from 'express';
import {
    createRestaurante,
    deleteRestaurante,
    getRestauranteId,
    getRestaurants,
    updateRestaurante
} from '../controllers/restaurantController.js';

const restaurantRouter = Router ();

restaurantRouter.get('/api/getRestaurants', getRestaurants);
restaurantRouter.get('/api/Restaurants/:id', getRestauranteId);
restaurantRouter.post('/api/Restaurants', createRestaurante);
restaurantRouter.patch('/api/Restaurants/:id', updateRestaurante);
restaurantRouter.delete('/api/Restaurants/:id', deleteRestaurante);


export default restaurantRouter;