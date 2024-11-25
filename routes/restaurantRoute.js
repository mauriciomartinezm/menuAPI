import {Router} from 'express';
import {
    getRestaurants,
    getRestaurant,
    updateRestaurant,
    deleteRestaurante,
    registerRestaurant
} from '../controllers/restaurantController.js';

const restaurantRouter = Router ();

restaurantRouter.get('/getRestaurants', getRestaurants);
restaurantRouter.get('/getRestaurant:', getRestaurant);
restaurantRouter.put('/updateRestaurant', updateRestaurant);
restaurantRouter.delete('/deleteRestaurant,', deleteRestaurante);
restaurantRouter.post('/registerRestaurant', registerRestaurant);


export default restaurantRouter;