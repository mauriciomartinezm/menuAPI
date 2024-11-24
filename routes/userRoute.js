import {Router} from 'express';
import {
    getUsers,
    getUser,
    registerUser,
    deleteUser,
    updateUser,
    loginUser
} from '../controllers/userController.js';

const userRouter = Router ();

userRouter.get('/getUsers', getUsers);
userRouter.get('/getUser/:emailUser', getUser);
userRouter.post('/registerUser', registerUser);
userRouter.delete('/deleteUser/:emailUser', deleteUser);
userRouter.put('/updateUser/:emailUser', updateUser);
userRouter.get('/loginUser', loginUser);

export default userRouter;