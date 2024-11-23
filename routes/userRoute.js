import {Router} from 'express';
import {
    getUsers,
    getUser,
    registerUser,
    deleteUser,
    updateUser,
    //loginUser
} from '../controllers/userController.js';

const userRouter = Router ();

userRouter.get('/getUsers', getUsers);
userRouter.get('/getUser/:emailUsuario', getUser);
userRouter.post('/registerUser', registerUser);
userRouter.delete('/deleteUser/:emailUsuario', deleteUser);
userRouter.put('/updateUser/:emailUsuario', updateUser);

export default userRouter;