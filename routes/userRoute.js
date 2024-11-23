import {Router} from 'express';
import {
    getUsers,
    getUser,
    registerUser
    //updateUser,
    //loginUser
} from '../controllers/userController.js';

const userRouter = Router ();

userRouter.get('/getUsers', getUsers);
userRouter.get('/getUser/:emailUsuario', getUser);
userRouter.post('/registerUser', registerUser);

export default userRouter;