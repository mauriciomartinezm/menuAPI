import {Router} from 'express';
import {
    getRestaurants//,
    //getUser,
    //registerUser,
    //updateUser,
    //loginUser
} from '../controllers/restaurantController.js';

const restaurantRouter = Router ();

restaurantRouter.get('/getRestaurants', getRestaurants);


export default restaurantRouter;